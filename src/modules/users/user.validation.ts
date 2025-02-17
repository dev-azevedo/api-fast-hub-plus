import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";// Ajuste o caminho conforme necessário
import { CreateUserDto } from "./dtos/createUser.dto.js";
import { UpdateUserDto } from "./dtos/updateUser.dto.js";

export const validateCreateUserDto = (
  req: Request,
  res: Response,
  next: NextFunction
) =>{
  const userData = plainToInstance(CreateUserDto, req.body);

  validate(userData).then((errors) => {
    if (errors.length > 0) {
      const validationErrors = errors.map((error) => {
        return {
          property: error.property,
          constraints: error.constraints,
        };
      });

      return res
        .status(400)
        .json({ message: "Validation failed", errors: validationErrors });
    }

    // Se não houver erros, continue para o próximo middleware ou rota
    next();
  });
}

export const validateUpdateUserDto = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = plainToInstance(UpdateUserDto, req.body);

  validate(userData).then((errors) => {
    if (errors.length > 0) {
      const validationErrors = errors.map((error) => {
        return {
          property: error.property,
          constraints: error.constraints,
        };
      });

      return res
        .status(400)
        .json({ message: "Validation failed", errors: validationErrors });
    }

    // Se não houver erros, continue para o próximo middleware ou rota
    next();
  });
  
}