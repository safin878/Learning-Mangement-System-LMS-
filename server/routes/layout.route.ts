import express from "express";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
import { createLayout } from "../controllers/layout.controller";
const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  isAuthenticated,
  authorizedRoles("admin"),
  createLayout
);
export default layoutRouter;
