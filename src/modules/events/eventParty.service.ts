import { EventParty } from "@prisma/client";
import EventPartyRepository from "./eventParty.repository.js";
import CreateEventPartyDto from "./dtos/createEvent.dto.js";
import EventPartyMapper from "./eventParty.mapper.js";
import ResponseEventPartyDto from "./dtos/responseEvent.dto.js";
import UpdateEventPartyDto from "./dtos/updateEvent.dto.js";

class EventPartyService {
  private readonly _repository: EventPartyRepository;
  private readonly _mapper: EventPartyMapper;

  constructor() {
    this._repository = new EventPartyRepository();
    this._mapper = new EventPartyMapper();
  }

  public findAll = async (): Promise<ResponseEventPartyDto[]> => {
    const eventsOnDb = await this._repository.findAll();
    return this._mapper.mapEventsToResponse(eventsOnDb);
  };

  public findById = async (id: string): Promise<ResponseEventPartyDto> => {
    const eventPartyOnDb = await this._repository.findById(id);

    if (!eventPartyOnDb) throw new Error("Event not found");

    return this._mapper.mapEventToResponse(eventPartyOnDb);
  };

  public create = async (eventParty: CreateEventPartyDto): Promise<ResponseEventPartyDto> => {
    const { userId, ...eventPartyData }= eventParty 
    
    const eventFormatted =
      this._mapper.mapCreateEventPartyDtoToEvent(eventPartyData as CreateEventPartyDto);

    const eventPartyOnDb = await this._repository.createEvent(eventFormatted, userId);

    return this._mapper.mapEventToResponse(eventPartyOnDb);
  };

  public update = async (event: UpdateEventPartyDto): Promise<ResponseEventPartyDto> => {
    return new ResponseEventPartyDto();
    // const eventPartyOnDb = await this.findById(event.id) as EventParty;

    // if (!eventPartyOnDb) 
    //     throw new Error("Event not found");

    // const eventFormatted = this._mapper.mapUpdateEventPartyDtoToEvent(
    //   event,
    //   eventPartyOnDb
    // );

    // const updatedEvent = await this._repository.updateEvent(eventFormatted);

    // return this._mapper.mapEventToResponse(updatedEvent);
  };

  public deactiveEvent = async (id: string): Promise<void> => {
    await this._repository.deactiveEvent(id);
  };
}   

export default EventPartyService;