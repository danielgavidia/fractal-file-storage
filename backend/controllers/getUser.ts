import type { Request, Response } from "express";
import { getUserPrisma } from "../prisma/prismaFunctions";
import type { User } from "../types";

export const getUser = async (req: Request, res: Response) => {
  console.log("STARTED: getUser");
  const { firebaseId } = req.body;
  const prismaResponse: User = await getUserPrisma(firebaseId);
  console.log(prismaResponse);
  res.status(200).json({ prismaResponse: prismaResponse });
};
