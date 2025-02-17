
import { Response } from "express";
import httpStatus from "http-status";

class AppError {
    private readonly res: Response;

    constructor(res: Response) {
        this.res = res;
    }

    public errorHandler = (error: Error): void => {
        if (error instanceof Error) {
            this.res
              .status(httpStatus.BAD_REQUEST)
              .json({ message: error.message });
            return;
        }

        this.res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal server error" });
    };
}

export default AppError;