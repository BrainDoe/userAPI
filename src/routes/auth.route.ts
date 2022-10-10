import express from "express";
import {
  loginHandler
} from "../controller/auth.controller";
import validateResource from "../middleware/validateResouce";
import { createLoginSchema } from "../schema/auth.schema";

const router = express.Router();

router.post(
  "/api/v1/auth/login",
  validateResource(createLoginSchema),
  loginHandler
);

// router.post("/api/v1/auth/refresh", refreshAccessTokenHandler);

export default router;