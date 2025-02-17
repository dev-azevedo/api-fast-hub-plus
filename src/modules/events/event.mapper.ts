import { Event } from "@prisma/client";

import CreateEventDto from "./dtos/createEvent.dto.js";
import ResponseEventDto from "./dtos/responseEvent.dto.js";

class EventMapper {
  public mapEventToResponse = (event: Event): ResponseEventDto => {
    return {
      id: event.id,
      name: event.name,
      description: event.description,
      eventDate: event.eventDate,
      amountTickets: event.amountTickets,
      amountReservations: event.amountReservations,
      createdAt: event.createdAt,
    } as ResponseEventDto;
  };

  public mapEventsToResponse = (event: Event[]): ResponseEventDto[] => {
    return event.map((event: Event) => this.mapEventToResponse(event)) as ResponseEventDto[];
  };

  public mapCreateEventDtoToEvent = (event: CreateEventDto): Event => {
    return {
      name: event.name,
      description: event.description,
      eventDate: event.eventDate,
      amountTickets: event.amountTickets,
      amountReservations: event.amountReservations,
      active: event.active,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Event;
  };
}

export default EventMapper;