import { createFile } from "../prisma/prismaFunctions";
import { withLogging } from "../utils/withLogging";

// Types
import type { Request, Response } from "express";
import type { File } from "../types";

export const shareFile = withLogging("shareFile", false, async (req: Request, res: Response) => {
  const { shareUserId, fileKey, bucket, location } = req.body;
  const prismaResponse: File = await createFile(shareUserId, fileKey, bucket, location);

  // Res
  res.status(200).json({ prismaResponse: prismaResponse });
});
