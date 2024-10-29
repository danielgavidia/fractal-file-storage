import express from "express";
import multer from "multer";
import { healthCheck } from "../controllers/healthCheck";
import { downloadFile } from "../controllers/downloadFile";
import { uploadFile } from "../controllers/uploadFile";
import { getFiles } from "../controllers/getFiles";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// AWS Healthcheck
router.post("/healthcheck", healthCheck);

// Upload file to S3
router.post("/upload", upload.single("file"), uploadFile);

// Get a file from S3
router.get("/download/:key", downloadFile);

// Get file keys
router.get("/keys/all", getFiles);

export default router;
