import { Request, Response } from "express";

interface IBaseController<T> {
  findAll(req: Request, res: Response): Promise<void>;
  findById(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  deactive(req: Request, res: Response): Promise<void>;
}

export default IBaseController;
