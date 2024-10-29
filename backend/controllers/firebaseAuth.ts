import type { Request, Response } from "express";
import { getOrCreateUser } from "../prisma/prismaAuth";
import type { User } from "../types";
import { withLogging } from "../utils/withLogging";

export const firebaseAuth = withLogging("firebaseAuth", async (req: Request, res: Response) => {
  const { firebaseId, email } = req.body;
  const user: User = await getOrCreateUser(firebaseId, email);
  res.status(200).json({ user: user });
});
