import { Request, Response } from "express";
import httpStatus from "http-status";
import { EventParty } from "@prisma/client";

import EventPartyService from "./eventParty.service.js";
import BaseController from "../../shared/controllers/base.controller.js";
import CreateEventPartyDto from "./dtos/createEvent.dto.js";
import UpdateEventPartyDto from "./dtos/updateEvent.dto.js";
import ResponseEventPartyDto from "./dtos/responseEvent.dto.js";

class EventPartyController extends BaseController<EventParty, CreateEventPartyDto, UpdateEventPartyDto, ResponseEventPartyDto> {
    constructor() {
        super(new EventPartyService());
    }
}

export default EventPartyController;
