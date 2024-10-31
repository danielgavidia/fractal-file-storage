import type { Request, Response } from "express";
import { withLogging } from "../utils/withLogging";
import { getFilesPrisma } from "../prisma/prismaFunctions";
import type { File } from "../types";

export const getFiles = withLogging("getFiles", false, async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const prismaResponse: File[] = await getFilesPrisma(userId);
  res.status(200).json({ prismaResponse: prismaResponse });
});
