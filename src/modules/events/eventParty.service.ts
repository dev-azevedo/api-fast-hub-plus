import { EventParty } from "@prisma/client";
import EventPartyRepository from "./eventParty.repository.js";
import CreateEventPartyDto from "./dtos/createEvent.dto.js";
import EventPartyMapper from "./eventParty.mapper.js";
import ResponseEventPartyDto from "./dtos/responseEvent.dto.js";
import UpdateEventPartyDto from "./dtos/updateEvent.dto.js";
import BaseService from "../../shared/bases/base.service.js";

class EventPartyService extends BaseService<EventParty, CreateEventPartyDto, UpdateEventPartyDto, ResponseEventPartyDto> {
  private readonly _repositoryEventParty: EventPartyRepository;
  private readonly _mapperEventParty: EventPartyMapper;

  constructor() {
    const repository = new EventPartyRepository();
    const mapper = new EventPartyMapper();
    super(repository, mapper);
    this._repositoryEventParty = repository;
    this._mapperEventParty = mapper;
  }

  public create = async (eventParty: CreateEventPartyDto): Promise<ResponseEventPartyDto> => {
    const { userId, ...eventPartyData }= eventParty 
    
    const eventFormatted = this._mapperEventParty.mapCreateItemDtoToItem(
      eventPartyData as CreateEventPartyDto
    );

    const eventPartyOnDb = await this._repositoryEventParty.create(eventFormatted, userId);

    return this._mapperEventParty.mapItemToResponse(eventPartyOnDb);
  };

  public update = async (event: UpdateEventPartyDto): Promise<ResponseEventPartyDto> => {
    const eventPartyOnDb = await this.findById(event.id) as EventParty;

    if (!eventPartyOnDb) 
        throw new Error("Event not found");

    const eventFormatted = this._mapperEventParty.mapUpdateItemDtoToItem(
      event,
      eventPartyOnDb
    );

    const updatedEvent = await this._repositoryEventParty.update(eventFormatted);

    return this._mapperEventParty.mapItemToResponse(updatedEvent);
  };
}   

export default EventPartyService;