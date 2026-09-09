import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { addToWishlist, getWishlist, removeFromWishlist, } from "../controllers/wishlistControllers.js"

const routes = express.Router();

routes.post("/:courseId", authMiddleware, addToWishlist);

routes.get("/", authMiddleware, getWishlist);

routes.delete("/:courseId", authMiddleware, removeFromWishlist);

export default routes;