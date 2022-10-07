import { createUserSchema, verifyUserSchema, forgotPasswordSchema, resetPasswordSchema } from './../schema/user.schema';
import express, { Request, Response } from "express"
import validateResource from "../middleware/validateResouce";
import { createUserHandler, forgotPasswordHandler, resetPasswordHandler, verifyUserHandler } from '../controller/user.controller';

const router = express.Router();

router.post("/api/v1/auth", validateResource(createUserSchema), createUserHandler)

router.post(
  "/api/v1/auth/verify/:id/:verificationCode",
  validateResource(verifyUserSchema),
  verifyUserHandler
);

router.post(
  "/api/v1/auth/forgotpassword",
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);

router.post(
  "/api/v1/auth/resetpassword/:id/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);


export default router;
