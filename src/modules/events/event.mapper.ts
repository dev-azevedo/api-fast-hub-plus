import { Event } from "@prisma/client";

import CreateEventDto from "./dtos/createEvent.dto.js";

class EventMapper {
    
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
    }
}

export default EventMapper;