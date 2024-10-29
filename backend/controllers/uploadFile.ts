import type { Request, Response } from "express";
import { s3, awsBucket } from "../aws";

export const uploadFile = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  if (!awsBucket) {
    throw new Error("AWS_BUCKET is required");
  }

  const params = {
    Bucket: awsBucket,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  s3.upload(params, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
    if (err) {
      console.error("S3 upload error:", err);
      res.status(500).json({
        error: "Failed to upload file to S3",
        details: err.message,
      });
      return;
    }
    if (!req.file) {
      res.status(500).json({ error: "File not found" });
      return;
    }

    res.status(200).json({
      message: "File uploaded successfully",
      data: {
        location: data.Location,
        key: data.Key,
        bucket: data.Bucket,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
    });
  });
};
