import express from "express";
import multer from "multer";
import { s3, awsBucket } from "../aws";

const router = express.Router();

// Move your multer config here if it's only used for S3 routes
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// AWS Healthcheck
router.post("/healthcheck", (req, res) => {
  s3.listBuckets((err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data.Buckets);
    }
  });
});

// Upload file to S3
router.post("/upload", upload.single("file"), (req, res) => {
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
});

// Get a file from S3
router.get("/download/:key", (req, res) => {
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
});

export default router;
