import { Event } from "@prisma/client";
import EventRepository from "./event.repository.js";
import CreateEventDto from "./dtos/createEvent.dto.js";
import EventMapper from "./event.mapper.js";
import ResponseEventDto from "./dtos/responseEvent.dto.js";

class EventService {
  private readonly _repository: EventRepository;
  private readonly _mapper: EventMapper;

  constructor() {
    this._repository = new EventRepository();
    this._mapper = new EventMapper();
  }

  public findAll = async (): Promise<ResponseEventDto[]> => {
    const eventsOnDb = await this._repository.findAll();
    return this._mapper.mapEventsToResponse(eventsOnDb);
  };

  public findById = async (id: string): Promise<ResponseEventDto> => {
    const eventOnDb = await this._repository.findById(id);

    if (!eventOnDb) throw new Error("Event not found");

    return this._mapper.mapEventToResponse(eventOnDb);
  };

  public create = async (event: CreateEventDto): Promise<ResponseEventDto> => {
    const eventFormatted = this._mapper.mapCreateEventDtoToEvent(event);

    const eventOnDb = await this._repository.createEvent(eventFormatted);

    return this._mapper.mapEventToResponse(eventOnDb);
  };

  public update = async (event: Event): Promise<ResponseEventDto> => {
    const eventOnDb = await this._repository.updateEvent(event);

    return this._mapper.mapEventToResponse(eventOnDb);;
  };

  public deactiveEvent = async (id: string): Promise<void> => {
    await this._repository.deactiveEvent(id);
  };
}   

export default EventService;