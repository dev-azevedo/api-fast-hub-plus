import { Reservation } from "@prisma/client";
import ReservationMapper from "./reservation.mapper.js";
import ReservationRepository from "./reservation.repository.js";
import CreateReservationDto from "./dtos/createReservation.dto.js";
import EventPartyService from "modules/events/eventParty.service.js";
import e from "express";
import UpdateReservationDto from "./dtos/updateReservation.dto.js";
import ResponseReservationDto from "./dtos/responseReservation.dto.js";

class ReservationService {
  private readonly _repository: ReservationRepository;
  private readonly _mapper: ReservationMapper;
  private readonly _eventPartyService: EventPartyService;

  constructor() {
    this._repository = new ReservationRepository();
    this._mapper = new ReservationMapper();
    this._eventPartyService = new EventPartyService();
  }

  public findAll = async (): Promise<ResponseReservationDto[]> => {
    const reservationsOnDb = await this._repository.findAll();
    return this._mapper.mapReservationsToResponse(reservationsOnDb);
  };

  public findById = async (id: string): Promise<ResponseReservationDto> => {
    const reservationOnDb = await this._repository.findById(id);

    if (!reservationOnDb) throw new Error("Reservation not found");

    return this._mapper.mapReservationToResponse(reservationOnDb);
  };

  public create = async (
    reservation: CreateReservationDto
  ): Promise<ResponseReservationDto> => {
    const reservationOnDb = await this._repository.findByUserIdAndEventPartyId(
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
      this._mapper.mapCreateReservationDtoToReservation(reservation);

    const reservationCreated = await this._repository.create(
      reservationData,
      userId,
      eventPartyId
    );

    return this._mapper.mapReservationToResponse(reservationCreated);
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
      this._mapper.mapUpdateReservationDtoToReservation(
        reservation,
        reservationOnDb
      );

    eventPartyOnDb.amountReservations =
      eventPartyOnDb.amountReservations -
      reservationOnDb.amountReservations +
      reservation.amountReservations;
    await this._eventPartyService.update(eventPartyOnDb);

    const reservationUpdated = await this._repository.update(reservationFormatted);
    return this._mapper.mapReservationToResponse(reservationUpdated);
  };

  public deactive = async (id: string): Promise<void> => {
    const reservationOnDb = (await this.findById(id)) as Reservation;

    if (!reservationOnDb) throw new Error("Reservation not found");

    await this._repository.deactive(id);
  };
}

export default ReservationService;