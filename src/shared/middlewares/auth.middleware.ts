import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import JwtService from "../utils/jwt.service.js";

const jwt = new JwtService();

export const authUser = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;

  if (!token) {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
    
    return;
  }

  try {
    const decoded = jwt.verifyToken(token);
    if (decoded.id) {
      req.body.userId = decoded.id;
      next();
      return;
    }

    res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
    return;
  } catch (error) {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
    return;
  }
};
