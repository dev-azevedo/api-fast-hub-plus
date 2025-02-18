import { EventParty } from "@prisma/client";
import EventPartyRepository from "./eventParty.repository.js";
import CreateEventPartyDto from "./dtos/createEvent.dto.js";
import EventPartyMapper from "./eventParty.mapper.js";
import ResponseEventPartyDto from "./dtos/responseEvent.dto.js";
import UpdateEventPartyDto from "./dtos/updateEvent.dto.js";
import IBaseService from "../../shared/interfaces/baseService.interface.js";

class EventPartyService implements IBaseService<EventParty, CreateEventPartyDto, UpdateEventPartyDto, ResponseEventPartyDto> {
  private readonly _repository: EventPartyRepository;
  private readonly _mapper: EventPartyMapper;

  constructor() {
    this._repository = new EventPartyRepository();
    this._mapper = new EventPartyMapper();
  }

  public findAll = async (): Promise<ResponseEventPartyDto[]> => {
    const eventsOnDb = await this._repository.findAll();
    return this._mapper.mapEventsPartyToResponse(eventsOnDb);
  };

  public findById = async (id: string): Promise<ResponseEventPartyDto> => {
    const eventPartyOnDb = await this._repository.findById(id);

    if (!eventPartyOnDb) throw new Error("Event not found");

    return this._mapper.mapEventPartyToResponse(eventPartyOnDb);
  };

  public create = async (eventParty: CreateEventPartyDto): Promise<ResponseEventPartyDto> => {
    const { userId, ...eventPartyData }= eventParty 
    
    const eventFormatted =
      this._mapper.mapCreateEventPartyDtoToEvent(eventPartyData as CreateEventPartyDto);

    const eventPartyOnDb = await this._repository.create(eventFormatted, userId);

    return this._mapper.mapEventPartyToResponse(eventPartyOnDb);
  };

  public update = async (event: UpdateEventPartyDto): Promise<ResponseEventPartyDto> => {
    const eventPartyOnDb = await this.findById(event.id) as EventParty;

    if (!eventPartyOnDb) 
        throw new Error("Event not found");

    const eventFormatted = this._mapper.mapUpdateEventPartyDtoToEvent(
      event,
      eventPartyOnDb
    );

    const updatedEvent = await this._repository.update(eventFormatted);

    return this._mapper.mapEventPartyToResponse(updatedEvent);
  };

  public deactive = async (id: string): Promise<void> => {
    await this._repository.deactive(id);
  };
}   

export default EventPartyService;