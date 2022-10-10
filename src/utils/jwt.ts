import log from './logger';
import jwt from "jsonwebtoken";
import config from "config";

// SIGN JWT TOKEN
export const signToken = (id: string, email: string): string => {
  return jwt.sign({id, email}, config.get<string>("accessTokenPrivateKey"), {expiresIn: config.get<string>("accessTokenExpires")});
}

// SIGN JWT REFRESH TOKEN
export const signRefreshT = (id: string, email: string): string => {
  return jwt.sign({id, email}, config.get<string>("refreshTokenPrivateKey"), {expiresIn: config.get<string>("refreshTokenExpires")});
}

export interface jwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export function verifyJWT<T>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, config.get("accessTokenPrivateKey")) as T;
    return decoded;
  } catch (error: any) {
    console.log({ErrorType: error.name, ErrorMessage: error.message})
    log.error({ErrorName: error.name, ErrorMessage: error.message})
    return null;
  }
} 
