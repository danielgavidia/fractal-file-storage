import express from "express";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

// AWS
const awsBucket = process.env.AWS_BUCKET;
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: awsAccessKeyId ? awsAccessKeyId : "",
    secretAccessKey: awsSecretAccessKey ? awsSecretAccessKey : "",
  },
});

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Healthcheck
app.get("/", (req, res) => {
  res.status(200).send("Healthcheck");
});

// Upload a file to S3
app.post("/s3/upload", upload.single("file"), (req, res) => {
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

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
