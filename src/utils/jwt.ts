import jwt from "jsonwebtoken";
import config from "config";

// SIGN JWT TOKEN
export const signToken = (id: string, email: string,) => {
  return jwt.sign({id, email}, config.get<string>("accessTokenPrivateKey"), {expiresIn: config.get<string>("accessTokenExpires")});
}

// SIGN JWT REFRESH TOKEN
export const signRefreshT = (id: string, email: string) => {
  return jwt.sign({id, email}, config.get<string>("refreshTokenPrivateKey"), {expiresIn: config.get<string>("refreshTokenExpires")});
}
