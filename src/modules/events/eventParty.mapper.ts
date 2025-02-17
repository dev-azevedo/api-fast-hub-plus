import { EventParty } from "@prisma/client";

import CreateEventPartyDto from "./dtos/createEvent.dto.js";
import ResponseEventPartyDto from "./dtos/responseEvent.dto.js";
import UpdateEventPartyDto from "./dtos/updateEvent.dto.js";

class EventPartyMapper {

  public mapEventPartyToResponse = (
    eventParty: EventParty
  ): ResponseEventPartyDto => {
    return {
      id: eventParty.id,
      name: eventParty.name,
      description: eventParty.description,
      eventDate: eventParty.eventDate,
      amountTickets: eventParty.amountTickets,
      amountReservations: eventParty.amountReservations,
      createdAt: eventParty.createdAt,
      userId: eventParty.userId,
    } as ResponseEventPartyDto;
  };

  public mapEventsPartyToResponse = (
    eventsParties: EventParty[]
  ): ResponseEventPartyDto[] => {
    return eventsParties.map((eventParty: EventParty) =>
      this.mapEventPartyToResponse(eventParty)
    ) as ResponseEventPartyDto[];
  };

  public mapCreateEventPartyDtoToEvent = (
    eventParty: CreateEventPartyDto
  ): EventParty => {
    return {
      name: eventParty.name,
      description: eventParty.description,
      eventDate: eventParty.eventDate,
      amountTickets: eventParty.amountTickets,
      amountReservations: eventParty.amountReservations,
      active: eventParty.active,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as EventParty;
  };

  public mapUpdateEventPartyDtoToEvent = (
    eventParty: UpdateEventPartyDto,
    eventPartyOnDb: EventParty
  ): EventParty => {
    return {
      id: eventPartyOnDb.id,
      name: eventParty.name,
      description: eventParty.description,
      eventDate: eventParty.eventDate,
      amountTickets: eventParty.amountTickets,
      amountReservations: eventParty.amountReservations,
      active: eventPartyOnDb.active,
      userId: eventPartyOnDb.userId,
      createdAt: eventPartyOnDb.createdAt,
      updatedAt: new Date(),
    } as EventParty;
  };
}

export default EventPartyMapper;