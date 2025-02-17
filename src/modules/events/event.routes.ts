import { Router } from "express";

import EventController from "./event.controller.js";
import { authUser } from "./../../shared/middlewares/auth.middleware.js";

const eventRoutes = Router();
const eventController = new EventController();

eventRoutes.get("/events", authUser, eventController.findAll);
eventRoutes.get("/events/:id", authUser, eventController.findById);
eventRoutes.post("/events", authUser, eventController.create);
eventRoutes.put("/events/", authUser, eventController.update);
eventRoutes.patch("/events/deactive/:id", authUser, eventController.deactive);

export default eventRoutes;