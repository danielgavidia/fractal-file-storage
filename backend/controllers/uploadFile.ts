import type { Request, Response } from "express";
import { s3, awsBucket } from "../aws";
import { createFile } from "../prisma/prismaFunctions";
import type { File } from "../types";
import { withLogging } from "../utils/withLogging";

export const uploadFile = withLogging("uploadFile", async (req: Request, res: Response) => {
  // Error handling
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  if (!awsBucket) {
    res.status(400).json({ error: "AWS Bucket" });
    return;
  }

  // Logic
  const params = {
    Bucket: awsBucket,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  s3.upload(params, async (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
    // Error handling
    if (err) {
      console.error("S3 upload error:", err);
      res.status(500).json({ error: err });
      return;
    }
    if (!req.file) {
      console.error("File not found");
      res.status(500).json({ error: "File not found" });
      return;
    }

    // Logic
    const userId = req.params.userId;
    const prismaResponse: File = await createFile(userId, data.Key, data.Bucket, data.Location);
    const response = { awsResponse: data, prismaResponse: prismaResponse };

    // Res
    res.status(200).json(response);
  });
});
