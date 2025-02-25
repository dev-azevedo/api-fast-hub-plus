import { Reservation } from "@prisma/client";

import CreateReservationDto from "./dtos/createReservation.dto.js";
import UpdateReservationDto from "./dtos/updateReservation.dto.js";
import ResponseReservationDto from "./dtos/responseReservation.dto.js";
import IBaseMapper from "../../shared/interfaces/baseMapper.interface.js";

class ReservationMapper implements IBaseMapper<Reservation, CreateReservationDto, UpdateReservationDto, ResponseReservationDto> {
  public mapCreateItemDtoToItem = (item: CreateReservationDto): Reservation => {
    return {
      userId: item.userId,
      eventPartyId: item.eventPartyId,
      amountReservations: item.amountReservations,
      active: item.active,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Reservation;
  }

 public mapUpdateItemDtoToItem = (item: UpdateReservationDto, itemOnDb: Reservation): Reservation => {
    return {
      id: itemOnDb.id,
      userId: itemOnDb.userId,
      eventPartyId: itemOnDb.eventPartyId,
      amountReservations: item.amountReservations,
      active: itemOnDb.active,
      createdAt: itemOnDb.createdAt,
      updatedAt: new Date(),
    } as Reservation;
  }

  public mapItemToResponse = (item: Reservation): ResponseReservationDto => {
     return {
       id: item.id,
       userId: item.userId,
       eventPartyId: item.eventPartyId,
       amountReservations: item.amountReservations,
       createdAt: item.createdAt,
     } as ResponseReservationDto;
  }

  public mapItemsToResponses = (items: Reservation[]): ResponseReservationDto[] => {
    return items.map(
      (item) => this.mapItemToResponse(item) as ResponseReservationDto
    );
  }
}

export default ReservationMapper;