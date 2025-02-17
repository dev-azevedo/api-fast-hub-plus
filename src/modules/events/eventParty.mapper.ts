import { EventParty, User } from "@prisma/client";

import CreateEventPartyDto from "./dtos/createEvent.dto.js";
import ResponseEventPartyDto from "./dtos/responseEvent.dto.js";
import UpdateEventPartyDto from "./dtos/updateEvent.dto.js";
import UserMapper from "../users/user.mapper.js";

class EventPartyMapper {
  private readonly _userMapper: UserMapper;

  constructor() {
    this._userMapper = new UserMapper();
  }

  public mapEventToResponse = (
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

  public mapEventsToResponse = (
    eventsParties: EventParty[]
  ): ResponseEventPartyDto[] => {
    return eventsParties.map((eventParty: EventParty) =>
      this.mapEventToResponse(eventParty)
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
      id: eventParty.id,
      name: eventParty.name,
      description: eventParty.description,
      eventDate: eventParty.eventDate,
      amountTickets: eventParty.amountTickets,
      amountReservations: eventParty.amountReservations,
      active: eventPartyOnDb.active,
      createdAt: eventPartyOnDb.createdAt,
      updatedAt: new Date(),
    } as EventParty;
  };
}

export default EventPartyMapper;