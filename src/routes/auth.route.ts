import express from "express";
import {
  loginHandler, refreshAccessTokenHandler
} from "../controller/auth.controller";
import requireUser from "../middleware/requireUser.middleware";
import validateResource from "../middleware/validateResouce";
import { createLoginSchema } from "../schema/auth.schema";

const router = express.Router();

router.post(
  "/api/v1/auth/login",
  validateResource(createLoginSchema),
  loginHandler
);

router.post("/api/v1/auth/refresh", requireUser, refreshAccessTokenHandler);

export default router;