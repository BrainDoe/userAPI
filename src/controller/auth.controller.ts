import { DocumentType } from "@typegoose/typegoose";
import { Request, Response } from "express";
import { get } from "lodash";
import { User } from "../models/User.model";
import { CreateLoginInput } from "../schema/auth.schema";
import {
  findSessionById
} from "../service/auth.service";
import { findUserByEmail, findUserById } from "../service/user.service";
import { signToken, signRefreshT } from "../utils/jwt";


export async function loginHandler(req: Request<{}, {}, CreateLoginInput>, res: Response) {
  const message = "Invalid email or password";
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(404).send({
      status: "Failure",
      message
    });
  }

  if (!user.verified) {
    return res.status(401).send({
      status: "Failure",
      message: "Please verify your email"
    });
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return res.status(400).send(message);
  }

  // sign a access token
  const accessToken = signToken(user._id, user.email);

  // sign a refresh token
  const refreshToken = signRefreshT(user._id, user.email);

  // send the tokens

  return res.status(200).send({
    status: 'Success',
    message: "Sign in successfull",
    data: {
      accessToken,
      refreshToken,
    }
  });
}

// export async function refreshAccessTokenHandler(req: Request, res: Response) {
//   const refreshToken = get(req, "headers.x-refresh");

//   const decoded = verifyJwt<{ session: string }>(
//     refreshToken,
//     "refreshTokenPublicKey"
//   );

//   if (!decoded) {
//     return res.status(401).send({
//       status: "Failure",
//       message: "Could not refresh access token"
//     });
//   }

//   const session = await findSessionById(decoded.session);

//   if (!session || !session.valid) {
//     return res.status(401).send({
//       status: "Failure",
//       message: "Could not refresh access token"
//     });
//   }

//   const user = await findUserById(String(session.user));

//   if (!user) {
//     return res.status(401).send({
//       status: "Failure",
//       message: "Could not refresh access token"
//     });
//   }

//   const accessToken = signAccessToken(user);

//   return res.send({ accessToken });
// }