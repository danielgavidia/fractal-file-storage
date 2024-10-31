import express from "express";
import multer from "multer";
import { healthCheck } from "../controllers/healthCheck";
import { downloadFile } from "../controllers/downloadFile";
import { uploadFile } from "../controllers/uploadFile";
import { getFiles } from "../controllers/getFiles";
import { getUsersAll } from "../controllers/getUsersAll";
import { shareFile } from "../controllers/shareFile";
import { verifyFirebaseToken } from "./middleware";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// AWS Healthcheck
router.post("/healthcheck", verifyFirebaseToken, healthCheck);

// Upload file to S3 for a given user
router.post("/upload/:userId", verifyFirebaseToken, upload.single("file"), uploadFile);

// Get a file from S3
router.post("/download/:key", verifyFirebaseToken, downloadFile);

// Get file keys for given user
router.post("/files/:userId", verifyFirebaseToken, getFiles);

// Share file with another user
router.post("/share", verifyFirebaseToken, shareFile);

// Get all users
router.post("/users/all", verifyFirebaseToken, getUsersAll);

export default router;
