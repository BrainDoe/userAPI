import { Request, Response, NextFunction } from "express";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  if(!res.locals.user.active) {
    return res.status(400).send({
      status: 'Failure',
      message: 'Please login to access this route'
    })
  }
  
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export default requireUser;
