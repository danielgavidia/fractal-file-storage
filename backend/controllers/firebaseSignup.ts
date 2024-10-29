import type { Request, Response } from "express";
import { getUserSignup } from "../prisma/prismaAuth";
import type { User } from "../types";

export const firebaseSignup = async (req: Request, res: Response) => {
  const { firebaseId, email } = req.body;
  const user: User = await getUserSignup(firebaseId, email);
  console.log(user);
  res.status(200).json({ user: user });
};
