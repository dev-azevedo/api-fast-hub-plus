import { Response } from "express";
import httpStatus from "http-status";

class ErrorHandler {
  static handleError(res: Response, error: unknown) {
    if (error instanceof Error) {
      res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
    } else {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }
}

export default ErrorHandler;
