import { Request, Response } from "express";
import httpStatus from "http-status";

import ErrorHandler from "../../shared/errors/ErrorService.js";
import ReservationService from "./reservation.service.js";
import { Reservation } from "@prisma/client";
import CreateReservationDto from "./dtos/createReservation.dto.js";
import UpdateReservationDto from "./dtos/updateReservation.dto.js";
import BaseController from "shared/bases/base.controller.js";
import ResponseReservationDto from "./dtos/responseReservation.dto.js";

class ReservationController extends BaseController<Reservation, CreateReservationDto, UpdateReservationDto, ResponseReservationDto> {  
    constructor() {
        super(new ReservationService());
    };
    
}

export default ReservationController;