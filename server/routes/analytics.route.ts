import express from "express";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
import {
  getCoursesAnalytics,
  getOrderAnalytics,
  getUsersAnalytics,
} from "../controllers/analytics.controller";
const analyticsRouter = express.Router();

analyticsRouter.get(
  "/get-users-analytics",
  isAuthenticated,
  authorizedRoles("admin"),
  getUsersAnalytics
);
analyticsRouter.get(
  "/get-orders-analytics",
  isAuthenticated,
  authorizedRoles("admin"),
  getOrderAnalytics
);
analyticsRouter.get(
  "/get-courses-analytics",
  isAuthenticated,
  authorizedRoles("admin"),
  getCoursesAnalytics
);

export default analyticsRouter;
