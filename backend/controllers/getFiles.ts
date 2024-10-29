import type { Request, Response } from "express";
import { getFilesPrisma } from "../prisma/prismaFunctions";
import type { File } from "../types";

export const getFiles = async (req: Request, res: Response) => {
  const prismaResponse: File[] = await getFilesPrisma();
  console.log(prismaResponse);
  res.status(200).json({ prismaResponse: prismaResponse });
};