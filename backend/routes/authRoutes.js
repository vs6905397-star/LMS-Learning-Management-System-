import express from "express"
import { getCompletedCourse, getProfile, login, logout, signUp, updateProfile } from "../controllers/authControllers.js"
import upload from "../middleware/upload.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/signup", upload.single("dp"), signUp);

router.post("/login", login);

router.post("/logout", authMiddleware, logout);

router.get("/profile", authMiddleware, getProfile);

router.patch("/profile", authMiddleware, upload.single("dp"), updateProfile);

router.get("/completed-course", authMiddleware, getCompletedCourse);

export default router;