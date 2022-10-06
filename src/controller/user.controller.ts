import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";


export const createUserHandler = async (req: Request<{}, {}, CreateUserInput>, res: Response) => {
  const body = req.body;

  try {
    const user = await createUser(body);

    return res.status(201).send({
      status: "success",
      messaage: "User created successfully"
    })
  } catch (error: any) {
    if(error.code === 11000) {
      return res.status(409).send({
        status: "error",
        message: "Account already exists",
      })
    }

    return res.status(500).send({
      status: "error",
      message: error.message,
    })
  }
}