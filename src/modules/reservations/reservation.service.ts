import { Reservation } from "@prisma/client";
import ReservationMapper from "./reservation.mapper.js";
import ReservationRepository from "./reservation.repository.js";
import CreateReservationDto from "./dtos/createReservation.dto.js";
import EventPartyService from "modules/events/eventParty.service.js";
import UpdateReservationDto from "./dtos/updateReservation.dto.js";
import ResponseReservationDto from "./dtos/responseReservation.dto.js";
import BaseService from "./../../shared/bases/base.service.js";

class ReservationService extends BaseService<
  Reservation,
  CreateReservationDto,
  UpdateReservationDto,
  ResponseReservationDto
> {
  private readonly _eventPartyService: EventPartyService;
  private readonly _repositoryReservatio: ReservationRepository;

  constructor() {
    const repository = new ReservationRepository();
    const mapper = new ReservationMapper();
    super(repository, mapper);
    this._eventPartyService = new EventPartyService();
    this._repositoryReservatio = repository;
  }

  public create = async (
    reservation: CreateReservationDto
  ): Promise<ResponseReservationDto> => {
    const reservationOnDb =
      await this._repositoryReservatio.findByUserIdAndEventPartyId(
        reservation.userId,
        reservation.eventPartyId
      );

    if (reservationOnDb) throw new Error("Reservation already exists");

    const eventPartyOnDb = await this._eventPartyService.findById(
      reservation.eventPartyId
    );
    const amountReservations: number =
      eventPartyOnDb.amountTickets - eventPartyOnDb.amountReservations;

    if (reservation.amountReservations > amountReservations)
      throw new Error("Sorry, this event is full");

    eventPartyOnDb.amountReservations += reservation.amountReservations;
    await this._eventPartyService.update(eventPartyOnDb);

    const { eventPartyId, userId, ...reservationData } =
      this._mapper.mapCreateItemDtoToItem(reservation);

    const reservationCreated = await this._repository.create(
      reservationData,
      userId,
      eventPartyId
    );

    return this._mapper.mapItemToResponse(reservationCreated);
  };

  public update = async (
    reservation: UpdateReservationDto
  ): Promise<ResponseReservationDto> => {
    const reservationOnDb = (await this.findById(
      reservation.id
    )) as Reservation;

    if (!reservationOnDb) throw new Error("Reservation not found");

    const eventPartyOnDb = await this._eventPartyService.findById(
      reservation.eventPartyId
    );

    const amountReservations: number =
      eventPartyOnDb.amountTickets -
      (eventPartyOnDb.amountReservations - reservationOnDb.amountReservations);

    if (reservation.amountReservations > amountReservations)
      throw new Error("Sorry, this event is full");

    const reservationFormatted =
      this._mapper.mapUpdateItemDtoToItem(
        reservation,
        reservationOnDb
      );

    eventPartyOnDb.amountReservations =
      eventPartyOnDb.amountReservations -
      reservationOnDb.amountReservations +
      reservation.amountReservations;
    await this._eventPartyService.update(eventPartyOnDb);

    const reservationUpdated = await this._repository.update(
      reservationFormatted
    );
    return this._mapper.mapItemToResponse(reservationUpdated);
  };
}

export default ReservationService;