import { Reservation } from "@prisma/client";
import ReservationMapper from "./reservation.mapper.js";
import ReservationRepository from "./reservation.repository.js";
import CreateReservationDto from "./dtos/createReservation.dto.js";

class ReservationService {
    private readonly _repository: ReservationRepository;
    private readonly _mapper: ReservationMapper;

    constructor() {
        this._repository = new ReservationRepository();
        this._mapper = new ReservationMapper();
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
        const {eventPartyId, userId, ...reservationData} = this._mapper.mapCreateReservationDtoToReservation(reservation);
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