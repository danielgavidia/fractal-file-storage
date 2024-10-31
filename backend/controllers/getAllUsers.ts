import { withLogging } from "../utils/withLogging";
import { getAllUsersPrisma } from "../prisma/prismaFunctions";

// Types
import type { Request, Response } from "express";
import type { User } from "../types";

export const getAllUsers = withLogging(
  "getAllUsers",
  false,
  async (req: Request, res: Response) => {
    const users: User[] = await getAllUsersPrisma();
    res.status(200).json({ users: users });
  }
);
