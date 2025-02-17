import { PrismaClient, Event } from "@prisma/client";

class EventRepository {
    private readonly _prisma: PrismaClient;

    constructor() {
        this._prisma = new PrismaClient();
    }

    public findAll = async (): Promise<Event[]> => {
        return await this._prisma.event.findMany();
    }

    public findById = async (id: string): Promise<Event | null> => {
        return await this._prisma.event.findUnique({
            where: { id },
        });
    }

    public createEvent = async (
        event: Event
    ): Promise<Event> => {
        return await this._prisma.event.create({
            data: event,
        });
    }

    public updateEvent = async (
        event: Event
    ): Promise<Event> => {
        return await this._prisma.event.update({
            where: { id: event.id },
            data: event,
        });
    }

    public deactiveEvent = async (id: string): Promise<void> => {
        await this._prisma.event.update({
            where: { id: id },
            data: { active: false },
        });
    }
}   

export default EventRepository;