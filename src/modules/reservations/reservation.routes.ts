import { Router } from "express";

import { authUser } from "./../../shared/middlewares/auth.middleware.js";
import ReservationController from "./reservation.controller.js";
import { validateCreateReservationDto, validateUpdateReservationDto } from "./reservation.validation.js";


const reservationRoutes = Router();
const reservationController = new ReservationController();

reservationRoutes.get("/reservations", authUser, reservationController.findAll);
reservationRoutes.get("/reservations/:id", authUser, reservationController.findById);
reservationRoutes.post("/reservations", authUser, validateCreateReservationDto, reservationController.create);
reservationRoutes.put("/reservations", authUser, validateUpdateReservationDto, reservationController.update);
reservationRoutes.patch("/reservations/deactive/:id", authUser, reservationController.deactive);

export default reservationRoutes;