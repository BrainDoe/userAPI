import { DocumentType } from "@typegoose/typegoose";
import { omit } from "lodash";
import SessionModel from "../models/session.model";
import { privateFields, User } from "../models/User.model";
import { findUserById } from "./user.service";

export async function createSession({ userId }: { userId: string }) {
  return SessionModel.create({ user: userId });
} 

export async function findSessionById(id: string) {
  return SessionModel.findById(id);
}
