import type { Request, Response } from "express";
import type { User } from "../types";
import { withLogging } from "../utils/withLogging";
import { getUserPrisma } from "../prisma/prismaFunctions";

export const getUser = withLogging("getUser", false, async (req: Request, res: Response) => {
  const { firebaseId } = req.body;
  const prismaResponse: User = await getUserPrisma(firebaseId);
  res.status(200).json({ prismaResponse: prismaResponse });
});
