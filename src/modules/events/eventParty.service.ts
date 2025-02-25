import { EventParty } from "@prisma/client";
import EventPartyRepository from "./eventParty.repository.js";
import CreateEventPartyDto from "./dtos/createEvent.dto.js";
import EventPartyMapper from "./eventParty.mapper.js";
import ResponseEventPartyDto from "./dtos/responseEvent.dto.js";
import UpdateEventPartyDto from "./dtos/updateEvent.dto.js";
import BaseService from "../../shared/bases/base.service.js";

class EventPartyService extends BaseService<EventParty, CreateEventPartyDto, UpdateEventPartyDto, ResponseEventPartyDto> {
  private readonly _repositoryEventParty: EventPartyRepository;

  constructor() {
    const repository = new EventPartyRepository();
    const mapper = new EventPartyMapper();
    super(repository, mapper);
    this._repositoryEventParty = repository;
  }

  public create = async (eventParty: CreateEventPartyDto): Promise<ResponseEventPartyDto> => {
    const { userId, ...eventPartyData } = eventParty;

    const eventPartyOnDb = await this._repositoryEventParty.findByName(eventPartyData.name);

    if (eventPartyOnDb.length > 0) 
      throw new Error("EventParty already exists");
    
    const eventFormatted = this._mapper.mapCreateItemDtoToItem(
      eventPartyData as CreateEventPartyDto
    );

    const eventPartyCreated = await this._repositoryEventParty.create(eventFormatted, userId);

    return this._mapper.mapItemToResponse(eventPartyCreated);
  };

  public update = async (event: UpdateEventPartyDto): Promise<ResponseEventPartyDto> => {
    const eventPartyOnDb = await this.findById(event.id) as EventParty;

    if (!eventPartyOnDb) 
        throw new Error("EventParty not found");

    const eventPartyOnDbWithName = await this._repositoryEventParty.findByName(event.name);

    if (eventPartyOnDbWithName.length > 0) {
        const conflitEventByName = eventPartyOnDbWithName.find(eventParty => eventParty.id !== event.id);
        if (conflitEventByName) 
            throw new Error("EventParty already exists");
    }

    const eventFormatted = this._mapper.mapUpdateItemDtoToItem(
      event,
      eventPartyOnDb
    );

    const updatedEvent = await this._repositoryEventParty.update(eventFormatted);

    return this._mapper.mapItemToResponse(updatedEvent);
  };
}   

export default EventPartyService;