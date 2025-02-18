import { Request, Response } from "express";
import httpStatus from "http-status";

import IBaseService from '../interfaces/baseService.interface.js';
import ErrorService from '../errors/ErrorService.js';
import IBaseController from '../interfaces/baseController.interface.js'

class BaseController<T> implements IBaseController<T> {
  private readonly _service: IBaseService<T>;

  constructor(service: IBaseService<T>) {
    this._service = service;
  }

  public findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.findAll();
      res.status(httpStatus.OK).json(result);
    } catch (error: unknown) {
      ErrorService.handleError(res, error);
    }
  };

  public findById = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;

    try {
      const result = await this._service.findById(id);
      res.status(httpStatus.OK).json(result);
    } catch (error: unknown) {
      ErrorService.handleError(res, error);
    }
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    const item: T = req.body;

    try {
      const result = await this._service.create(item);
      res.status(httpStatus.CREATED).json(result);
    } catch (error: unknown) {
      ErrorService.handleError(res, error);
    }
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    const item: T = req.body;

    try {
      const result = await this._service.update(item);
      res.status(httpStatus.OK).json(result);
    } catch (error: unknown) {
      ErrorService.handleError(res, error);
    }
  };

  public deactive = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;

    try {
      await this._service.deactive(id);
      res.status(httpStatus.NO_CONTENT).json();
    } catch (error: unknown) {
      ErrorService.handleError(res, error);
    }
  }
}

export default BaseController;
   