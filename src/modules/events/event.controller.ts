import { Request, Response } from "express";
import httpStatus from "http-status";

import EventService from "./event.service.js";
import ErrorHandler from "../../shared/errors/ErrorHandler.js";

class EventController {
  private readonly _service: EventService;

  constructor() {
    this._service = new EventService();
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
    try {
      const event = await this._service.deactiveEvent(req.params.id);
      res.status(httpStatus.NO_CONTENT);
    } catch (error) {
      ErrorHandler.handleError(res, error);
    }
  };
}

export default EventController;
