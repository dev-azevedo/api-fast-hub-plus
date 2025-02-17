import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import httpStatus from "http-status";

import CreateEventPartyDto from "./dtos/createEvent.dto.js";
import UpdateEventPartyDto from "./dtos/updateEvent.dto.js";

export const validateCreateEventPartyDto = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const eventData = plainToInstance(CreateEventPartyDto, req.body);

  validate(eventData).then((errors) => {
    if (errors.length > 0) {
      const validationErrors = errors.map((error) => {
        return {
          property: error.property,
          constraints: error.constraints,
        };
      });

      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Validation failed", errors: validationErrors });
    }

    next();
  });
};

export const validateUpdateEventPartyDto = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const eventData = plainToInstance(UpdateEventPartyDto, req.body);

  validate(eventData).then((errors) => {
    if (errors.length > 0) {
      const validationErrors = errors.map((error) => {
        return {
          property: error.property,
          constraints: error.constraints,
        };
      });

      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Validation failed", errors: validationErrors });
    }

    next();
  });
};