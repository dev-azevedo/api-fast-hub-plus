import { EventParty } from "@prisma/client";

import CreateEventPartyDto from "./dtos/createEvent.dto.js";
import ResponseEventPartyDto from "./dtos/responseEvent.dto.js";
import UpdateEventPartyDto from "./dtos/updateEvent.dto.js";
import IBaseMapper from "../../shared/interfaces/baseMapper.interface.js";

class EventPartyMapper implements IBaseMapper<EventParty, CreateEventPartyDto, UpdateEventPartyDto, ResponseEventPartyDto> {
  public mapCreateItemDtoToItem = (item: CreateEventPartyDto): EventParty => {
    return {
      name: item.name,
      description: item.description,
      eventDate: item.eventDate,
      amountTickets: item.amountTickets,
      amountReservations: item.amountReservations,
      active: item.active,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as EventParty;
  }

  public mapUpdateItemDtoToItem = (item: UpdateEventPartyDto, itemOnDb: EventParty) => {
     return {
      id: itemOnDb.id,
      name: item.name,
      description: item.description,
      eventDate: item.eventDate,
      amountTickets: item.amountTickets,
      amountReservations: item.amountReservations,
      active: itemOnDb.active,
      userId: itemOnDb.userId,
      createdAt: itemOnDb.createdAt,
      updatedAt: new Date(),
    } as EventParty;
  }

  public mapItemToResponse = (item: EventParty): ResponseEventPartyDto => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      eventDate: item.eventDate,
      amountTickets: item.amountTickets,
      amountReservations: item.amountReservations,
      createdAt: item.createdAt,
      userId: item.userId,
    } as ResponseEventPartyDto;
  }

  public mapItemsToResponses = (items: EventParty[]): ResponseEventPartyDto[] => {
     return items.map((item: EventParty) =>
      this.mapItemToResponse(item)
    ) as ResponseEventPartyDto[];
  }
}

export default EventPartyMapper;