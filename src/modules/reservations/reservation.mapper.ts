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
}

export default ReservationMapper;