import express from "express";
import { firebaseLogin } from "../controllers/firebaseLogin";
import { firebaseSignup } from "../controllers/firebaseSignup";
import { getUser } from "../controllers/getUser";
import { verifyFirebaseToken } from "./middleware";

const router = express.Router();

router.post("/login", verifyFirebaseToken, firebaseLogin);
router.post("/signup", verifyFirebaseToken, firebaseSignup);
router.post("/user", verifyFirebaseToken, getUser);

export default router;
