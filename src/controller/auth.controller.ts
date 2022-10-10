import { DocumentType } from "@typegoose/typegoose";
import { Request, Response } from "express";
import { CreateLoginInput } from "../schema/auth.schema";
import { findUserByEmail, findUserById } from "../service/user.service";
import { signToken, signRefreshT, verifyJWT, verifyRefreshToken } from "../utils/jwt";


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

  user.valid = true;
  await user.save();

  // sign a access token
  const accessToken = signToken(user._id, user.email);

  // sign a refresh token
  const refreshToken = signRefreshT(user._id, user.email);

  return res.status(200).send({
    status: 'Success',
    message: "Sign in successfull",
    data: {
      accessToken,
      refreshToken,
    }
  });
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
  // const refreshToken = get(req, "headers.x-refresh");
  const refreshToken: any = req.headers["x-refresh"];

  const decoded = verifyRefreshToken<{ id: string }>(refreshToken);

  if(decoded === null) {
    return res.status(401).send({
      status: "Failure",
      message: "Could not refresh access token....."
    });
  }

  const user = await findUserById(String(decoded.id));

  if(!user || !user.valid) {
    return res.status(401).send({
      status: "Failure",
      message: "Could not refresh access token"
    });
  }

  const accessToken = signToken(user._id, user.email)
  const refresh = signRefreshT(user._id, user.email)
  
  return res.status(200).send({
    status: "Success",
    data: {
      accessToken,
      refreshToken: refresh
    }
  });
}