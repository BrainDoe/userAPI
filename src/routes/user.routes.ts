import { createUserSchema, verifyUserSchema, forgotPasswordSchema, resetPasswordSchema } from './../schema/user.schema';
import express, { Request, Response } from "express"
import validateResource from "../middleware/validateResouce";
import { createUserHandler, forgotPasswordHandler, getCurrentUserHandler, resetPasswordHandler, verifyUserHandler } from '../controller/user.controller';
import requireUser from '../middleware/requireUser.middleware';

const router = express.Router();

router.post("/api/v1/users", validateResource(createUserSchema), createUserHandler);

router.get("/api/v1/users/me", requireUser, getCurrentUserHandler);

router.post(
  "/api/v1/users/verify/:id/:verificationCode",
  validateResource(verifyUserSchema),
  verifyUserHandler
);

router.post(
  "/api/v1/users/forgotpassword",
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);

router.post(
  "/api/v1/users/resetpassword/:id/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);


export default router;
