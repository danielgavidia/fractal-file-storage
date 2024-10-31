import type { Request, Response } from "express";
import { withLogging } from "../utils/withLogging";
import { getOrCreateUser } from "../prisma/prismaAuth";
import type { User } from "../types";

export const firebaseAuth = withLogging(
  "firebaseAuth",
  false,
  async (req: Request, res: Response) => {
    const { firebaseId, email } = req.body;
    const user: User = await getOrCreateUser(firebaseId, email);
    res.status(200).json({ user: user });
  }
);
