import express from "express";
import { firebaseAuth } from "../controllers/firebaseAuth";
import { getUser } from "../controllers/getUser";
import { verifyFirebaseToken } from "./middleware";

const router = express.Router();

router.post("/login", verifyFirebaseToken, firebaseAuth);
router.post("/user", verifyFirebaseToken, getUser);

export default router;
