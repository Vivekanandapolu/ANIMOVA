import express from "express";
import {
  loginUser,
  sendingOtp,
  signup,
} from "../Controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/", loginUser);

//OTP routes
router.post("/sendOTP", sendingOtp);

export default router;
