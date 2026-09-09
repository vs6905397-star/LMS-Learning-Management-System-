import express  from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { createReview, deleteReview, getCourseReview } from "../controllers/reviewControllers.js"

const routes = express.Router();

routes.post("/", authMiddleware, createReview);

routes.get("/:courseId", getCourseReview);

routes.delete("/:reviewId", authMiddleware, deleteReview);

export default routes;
