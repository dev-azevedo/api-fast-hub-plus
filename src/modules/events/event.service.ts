import { Event } from "@prisma/client";
import EventRepository from "./event.repository.js";

class EventService {
    private readonly _repository: EventRepository;

    constructor(repository: EventRepository) {
        this._repository = repository;
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

    public create = async (event: Event): Promise<Event> => {
        const eventOnDb = await this._repository.createEvent(event);

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