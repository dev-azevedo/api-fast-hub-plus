import { Reservation } from "@prisma/client";

import CreateReservationDto from "./dtos/createReservation.dto.js";
import UpdateReservationDto from "./dtos/updateReservation.dto.js";
import ResponseReservationDto from "./dtos/responseReservation.dto.js";

class ReservationMapper {
  public mapReservationToResponse = (
    reservation: Reservation
  ): ResponseReservationDto => {
    return {
      id: reservation.id,
      userId: reservation.userId,
      eventPartyId: reservation.eventPartyId,
      amountReservations: reservation.amountReservations,
      createdAt: reservation.createdAt,
    } as ResponseReservationDto;
  };

  public mapReservationsToResponse = (
    reservations: Reservation[]
  ): ResponseReservationDto[] => {
    return reservations.map(
      (reservation) =>
        this.mapReservationToResponse(reservation) as ResponseReservationDto
    );
  };

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
  };

  public mapUpdateReservationDtoToReservation = (
    reservation: UpdateReservationDto,
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
  };
}

export default ReservationMapper;