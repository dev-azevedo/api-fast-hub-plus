import { Request, Response } from "express";
import httpStatus from "http-status";

import ErrorHandler from "../../shared/errors/ErrorService.js";
import ReservationService from "./reservation.service.js";
import { Reservation } from "@prisma/client";
import CreateReservationDto from "./dtos/createReservation.dto.js";
import UpdateReservationDto from "./dtos/updateReservation.dto.js";

class ReservationController {
    private readonly _service: ReservationService;

    constructor() {
        this._service = new ReservationService();
    }

    public findAll = async (req: Request, res: Response): Promise<void> => {
        try {
            res.status(httpStatus.OK).json(await this._service.findAll());
        } catch (error) {
            ErrorHandler.handleError(res, error);   
        }
    }

    public findById = async (req: Request, res: Response): Promise<void> => {
        const id: string = req.params.id;

        try {
            res.status(httpStatus.OK).json(await this._service.findById(id));
        } catch (error) {
            ErrorHandler.handleError(res, error);
        }
    }

    public create = async (req: Request, res: Response): Promise<void> => {
        const reservation: CreateReservationDto = req.body;

        try {
            res.status(httpStatus.CREATED).json(await this._service.create(reservation));
        } catch (error) {
            ErrorHandler.handleError(res, error);
        }
    }

    public update = async (req: Request, res: Response): Promise<void> => {
        const reservation: UpdateReservationDto = req.body;

        try {
            res.status(httpStatus.OK).json(await this._service.update(reservation));
        } catch (error) {
            ErrorHandler.handleError(res, error);
        }
    }

    public deactive = async (req: Request, res: Response): Promise<void> => {
        const id: string = req.params.id;

        try {
            await this._service.deactive(id);
            res.status(httpStatus.NO_CONTENT).json();
        } catch (error) {
            ErrorHandler.handleError(res, error);
        }
    }
}

export default ReservationController;