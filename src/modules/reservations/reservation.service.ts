import { Reservation } from "@prisma/client";
import ReservationMapper from "./reservation.mapper.js";
import ReservationRepository from "./reservation.repository.js";
import CreateReservationDto from "./dtos/createReservation.dto.js";
import EventPartyService from "modules/events/eventParty.service.js";
import e from "express";

class ReservationService {
    private readonly _repository: ReservationRepository;
    private readonly _mapper: ReservationMapper;
    private readonly _eventPartyService: EventPartyService;

    constructor() {
        this._repository = new ReservationRepository();
        this._mapper = new ReservationMapper();
        this._eventPartyService = new EventPartyService();
    }

    public findAll = async (): Promise<Reservation[]> => {
        return this._repository.findAll();
    }

    public findById = async (id: string): Promise<Reservation> => {
        const reservationOnDb = await this._repository.findById(id);

        if (!reservationOnDb) 
            throw new Error("Reservation not found");

        return reservationOnDb;
    }

    public create = async (reservation: CreateReservationDto): Promise<Reservation> => {
        const reservationOnDb = await this._repository.findByUserIdAndEventPartyId(
          reservation.userId,
          reservation.eventPartyId
        );

        if (reservationOnDb)
            throw new Error("Reservation already exists");


        const eventPartyOnDb = await this._eventPartyService.findById(reservation.eventPartyId);
        const amountReservations: number = eventPartyOnDb.amountTickets - eventPartyOnDb.amountReservations;

        if (reservation.amountReservations > amountReservations)
          throw new Error("Sorry, this event is full");

        eventPartyOnDb.amountReservations += reservation.amountReservations;
        await this._eventPartyService.update(eventPartyOnDb);

        const { eventPartyId, userId, ...reservationData } =
            this._mapper.mapCreateReservationDtoToReservation(reservation);

        return this._repository.create(
          reservationData,
          userId,
          eventPartyId
        );

    }

    public update = async (reservation: Reservation): Promise<Reservation> => {
        const reservationOnDb = await this.findById(reservation.id) as Reservation;

        if (!reservationOnDb)
            throw new Error("Reservation not found");
        
        return this._repository.update(reservation);
    }

    public deactive = async (id: string): Promise<void> => {
        const reservationOnDb = await this.findById(id) as Reservation;

        if (!reservationOnDb)
            throw new Error("Reservation not found");
        
        await this._repository.deactive(id);
    }
}

export default ReservationService;