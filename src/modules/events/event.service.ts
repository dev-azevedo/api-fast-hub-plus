import { Event } from "@prisma/client";
import EventRepository from "./event.repository.js";
import CreateEventDto from "./dtos/createEvent.dto.js";
import EventMapper from "./event.mapper.js";

class EventService {
    private readonly _repository: EventRepository;
    private readonly _mapper: EventMapper;

    constructor() {
        this._repository = new EventRepository();
        this._mapper = new EventMapper();
    }

    public findAll = async (): Promise<Event[]> => {
        return await this._repository.findAll();
    }

    public findById = async (id: string): Promise<Event> => {
        const eventOnDb = await this._repository.findById(id);

        if (!eventOnDb)
            throw new Error("Event not found");

        return eventOnDb;
    }

    public create = async (event: Event): Promise<CreateEventDto> => {
        const eventFormatted = this._mapper.mapCreateEventDtoToEvent(event);
        
        const eventOnDb = await this._repository.createEvent(eventFormatted);

        return eventOnDb;
    }

    public update = async (event: Event): Promise<Event> => {
        const eventOnDb = await this._repository.updateEvent(event);

        return eventOnDb;
    }

    public deactiveEvent = async (id: string): Promise<void> => {
        await this._repository.deactiveEvent(id);
    }
}   

export default EventService;