import { Reservation } from "@prisma/client";
import CreateReservationDto from "./dtos/createReservation.dto.js";

class ReservationMapper {
    
    public mapCreateReservationDtoToReservation = (
        reservation: CreateReservationDto
    ): Reservation => {
        return {
            userId: reservation.userId,
            eventPartyId: reservation.eventPartyId,
            amountReservations: reservation.amountReservations,
            active: reservation.active,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as Reservation;
    }

    public mapUpdateReservationDtoToReservation = (
        reservation: CreateReservationDto,
        reservationOnDb: Reservation
    ): Reservation => {
        return {
          id: reservationOnDb.id,
          userId: reservationOnDb.userId,
          eventPartyId: reservationOnDb.eventPartyId,
          amountReservations: reservation.amountReservations,
          active: reservationOnDb.active,
          createdAt: reservationOnDb.createdAt,
          updatedAt: new Date(),
        } as Reservation;
    }
}

export default ReservationMapper;