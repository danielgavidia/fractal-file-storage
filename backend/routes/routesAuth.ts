import express from "express";
import { firebaseLogin } from "../controllers/firebaseLogin";
import { firebaseSignup } from "../controllers/firebaseSignup";

const router = express.Router();

router.post("login", firebaseLogin);
router.post("signup", firebaseSignup);

export default router;
