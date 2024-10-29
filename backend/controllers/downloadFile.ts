import type { Request, Response } from "express";
import { s3, awsBucket } from "../aws";

export const downloadFile = async (req: Request, res: Response) => {
  if (!awsBucket) {
    throw new Error("AWS_BUCKET is required");
  }

  const params = {
    Bucket: awsBucket,
    Key: req.params.key,
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      console.error("S3 download error:", err);
      if (err.code === "NoSuchKey") {
        res.status(404).json({
          error: "File not found",
          details: err.message,
        });
      } else {
        res.status(500).json({
          error: "Failed to download file from S3",
          details: err.message,
        });
      }
      return;
    }

    // Set the appropriate headers
    res.set({
      "Content-Type": data.ContentType,
      "Content-Length": data.ContentLength,
      "Last-Modified": data.LastModified,
      ETag: data.ETag,
    });

    // Send the file data in the response
    res.send(data.Body);
  });
};