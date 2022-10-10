import { Request, Response, NextFunction } from "express";
import { findUserById } from "../service/user.service";
import { verifyJWT } from "../utils/jwt";


const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = (req.headers.authorization || "").replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) {
    return next();
  }

  const decoded = verifyJWT<{id: string}>(accessToken);

  if(decoded === null) { 
    return res.status(401).send({
      status: "Failure",
      message: "Invalid access token"
    }); 
  }

  const decodedUser = await findUserById(decoded!.id); 

  //@ts-ignore
  const { verified, verificationCode, passwordResetCode, createdAt, updatedAt, password, __v, ...rest} = decodedUser._doc;

  const filteredUser = {
    ...rest,
    //@ts-ignore
    iat: decoded!.iat,
    //@ts-ignore
    exp: decoded!.exp,
  }

  if (decoded) {
    res.locals.user = filteredUser;
  }

  return next();
};

export default deserializeUser;