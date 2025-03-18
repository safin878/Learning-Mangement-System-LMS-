import express from "express";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
import {
  getNotifications,
  updateNotifications,
} from "../controllers/notification.controller";

const notificationRouter = express.Router();

notificationRouter.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizedRoles("admin"),
  getNotifications
);
notificationRouter.put(
  "/update-notifications/:id",
  isAuthenticated,
  authorizedRoles("admin"),
  updateNotifications
);

export default notificationRouter;
