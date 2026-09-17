import express from "express"
import { forgotPassword, getCompletedCourse, getProfile, login, logout, resendOTP, resetPassword, signUp, updateProfile, verifyOTP, verifyResetOtp } from "../controllers/authControllers.js"
import upload from "../middleware/upload.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/signup", upload.single("dp"), signUp);

router.post("/verify-otp", verifyOTP)

router.post("/resend-otp", resendOTP)

router.post("/login", login);

router.post("/logout", authMiddleware, logout);

router.post("/forgot-password", forgotPassword);

router.post("/verify-reset-otp", verifyResetOtp);

router.post("/reset-password", resetPassword);

router.get("/profile", authMiddleware, getProfile);

router.patch("/profile", authMiddleware, upload.single("dp"), updateProfile);

router.get("/completed-course", authMiddleware, getCompletedCourse);

export default router;