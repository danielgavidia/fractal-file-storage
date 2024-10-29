import type { Request, Response } from "express";
import { getUserPrisma } from "../prisma/prismaFunctions";
import type { User } from "../types";
import { withLogging } from "../utils/withLogging";

export const getUser = withLogging("getUser", async (req: Request, res: Response) => {
  const { firebaseId } = req.body;
  const prismaResponse: User = await getUserPrisma(firebaseId);
  res.status(200).json({ prismaResponse: prismaResponse });
});
