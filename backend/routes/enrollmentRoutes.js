import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { completeLesson, createEnrollment, getEnrollmentById, getMyEnrollment } from "../controllers/enrollmentControllers.js"

const routes = express.Router();

routes.post("/", authMiddleware, createEnrollment);

routes.get("/", authMiddleware, getMyEnrollment);

routes.get("/:enrollmentId", authMiddleware, getEnrollmentById);

routes.patch("/:enrollmentId/lesson/:lessonId", authMiddleware, completeLesson);

export default routes;