import { withLogging } from "../utils/withLogging";
import { getUsersAllPrisma } from "../prisma/prismaFunctions";

// Types
import type { Request, Response } from "express";
import type { User } from "../types";

export const getUsersAll = withLogging(
  "getUsersAll",
  false,
  async (req: Request, res: Response) => {
    const users: User[] = await getUsersAllPrisma();
    res.status(200).json({ users: users });
  }
);
