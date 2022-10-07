import { createUserSchema, verifyUserSchema } from './../schema/user.schema';
import express, { Request, Response } from "express"
import validateResource from "../middleware/validateResouce";
import { createUserHandler, verifyUserHandler } from '../controller/user.controller';

const router = express.Router();

router.post("/api/v1/auth", validateResource(createUserSchema), createUserHandler)

router.post(
  "/api/v1/auth/verify/:id/:verificationCode",
  validateResource(verifyUserSchema),
  verifyUserHandler
);


export default router;