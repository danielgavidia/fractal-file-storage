import type { Request, Response } from "express";
import { getUserLogin } from "../prisma/prismaAuth";
import type { User } from "../types";

export const firebaseLogin = async (req: Request, res: Response) => {
  console.log("STARTED: firebaseLogin");
  const { firebaseId } = req.body;
  const user: User = await getUserLogin(firebaseId);
  console.log(user);
  res.status(200).json({ user: user });
};
