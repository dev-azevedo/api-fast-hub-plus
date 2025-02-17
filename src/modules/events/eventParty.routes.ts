import { Router } from "express";

import EventPartyController from "./eventParty.controller.js";
import { authUser } from "../../shared/middlewares/auth.middleware.js";
import { validateCreateEventPartyDto, validateUpdateEventPartyDto } from "./eventParty.validation.js";

const eventPartyRoutes = Router();
const eventPartyController = new EventPartyController();

eventPartyRoutes.get("/events", authUser, eventPartyController.findAll);
eventPartyRoutes.get("/events/:id", authUser, eventPartyController.findById);
eventPartyRoutes.post("/events", authUser, validateCreateEventPartyDto, eventPartyController.create);
eventPartyRoutes.put(
  "/events/",
  authUser,
  validateUpdateEventPartyDto, eventPartyController.update
);
eventPartyRoutes.patch("/events/deactive/:id", authUser, eventPartyController.deactive);

export default eventPartyRoutes;