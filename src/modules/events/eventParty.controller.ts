import { Request, Response } from "express";
import httpStatus from "http-status";

import EventPartyService from "./eventParty.service.js";
import ErrorHandler from "../../shared/errors/ErrorHandler.js";

class EventPartyController {
  private readonly _service: EventPartyService;

  constructor() {
    this._service = new EventPartyService();
  }

  public findAll = async (req: Request, res: Response) => {
    try {
      const events = await this._service.findAll();
      res.status(httpStatus.OK).json(events);
    } catch (error) {
      ErrorHandler.handleError(res, error);
    }
  };

  public findById = async (req: Request, res: Response) => {
    try {
      const event = await this._service.findById(req.params.id);
      res.status(httpStatus.OK).json(event);
    } catch (error) {
      ErrorHandler.handleError(res, error);
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const event = await this._service.create(req.body);
      res.status(httpStatus.CREATED).json(event);
    } catch (error) {
      ErrorHandler.handleError(res, error);
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const event = await this._service.update(req.body);
      res.status(httpStatus.OK).json(event);
    } catch (error) {
      ErrorHandler.handleError(res, error);
    }
  };

  public deactive = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
      await this._service.deactive(id);
      res.status(httpStatus.NO_CONTENT).json();
    } catch (error) {
      ErrorHandler.handleError(res, error);
    }
  };
}

export default EventPartyController;
