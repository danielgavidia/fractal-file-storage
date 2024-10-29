import type { Request, Response } from "express";
import { getOrCreateUser } from "../prisma/prismaAuth";
import type { User } from "../types";

export const firebaseAuth = async (req: Request, res: Response) => {
  console.log("STARTED: BACKEND: firebaseAuth");
  const { firebaseId, email } = req.body;
  console.log(`SUCCESS: firebaseSignup, firebaseId: ${firebaseId}`);
  console.log(`SUCCESS: firebaseSignup, email: ${email}`);
  const user: User = await getOrCreateUser(firebaseId, email);
  console.log(user);
  res.status(200).json({ user: user });
};
