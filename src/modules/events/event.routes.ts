import { Router } from "express";

import EventController from "./event.controller.js";
import { authUser } from "./../../shared/middlewares/auth.middleware.js";
import { validateCreateEventDto, validateUpdateEventDto } from "./event.validation.js";

const eventRoutes = Router();
const eventController = new EventController();

eventRoutes.get("/events", authUser, eventController.findAll);
eventRoutes.get("/events/:id", authUser, eventController.findById);
eventRoutes.post("/events", authUser, validateCreateEventDto, eventController.create);
eventRoutes.put(
  "/events/",
  authUser,
  validateUpdateEventDto, eventController.update
);
eventRoutes.patch("/events/deactive/:id", authUser, eventController.deactive);

export default eventRoutes;