import type { Request, Response } from "express";
import { getFilesPrisma } from "../prisma/prismaFunctions";
import type { File } from "../types";
import { withLogging } from "../utils/withLogging";

export const getFiles = withLogging("getFiles", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const prismaResponse: File[] = await getFilesPrisma(userId);
  res.status(200).json({ prismaResponse: prismaResponse });
});
