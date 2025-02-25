import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import httpStatus from "http-status";

import CreateReservationDto from "./dtos/createReservation.dto.js";
import UpdateReservationDto from "./dtos/updateReservation.dto.js";

export const validateCreateReservationDto = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reservationData = plainToInstance(CreateReservationDto, req.body);

  validate(reservationData).then((errors) => {
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

export const validateUpdateReservationDto = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reservationData = plainToInstance(UpdateReservationDto, req.body);

  validate(reservationData).then((errors) => {
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
