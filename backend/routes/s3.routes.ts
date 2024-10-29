import express from "express";
import multer from "multer";
import { healthCheck } from "../controllers/healthCheck";
import { downloadFile } from "../controllers/downloadFile";
import { uploadFile } from "../controllers/uploadFile";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// AWS Healthcheck
router.post("/healthcheck", healthCheck);

// Upload file to S3
router.post("/upload", upload.single("file"), uploadFile);

// Get a file from S3
router.get("/download/:key", downloadFile);

export default router;
