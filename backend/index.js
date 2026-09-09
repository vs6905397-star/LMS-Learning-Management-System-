import "dotenv/config";
import express from "express"
import dotenv from "dotenv"

dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import enrollmentRoutes from "./routes/enrollmentRoutes.js"
import wishlistRoutes from "./routes/wishlistRoutes.js"



const app = express();


app.use(
    cors({
    origin: "https://lms-learning-management-system-2.onrender.com/login",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

connectDB();

app.use("/api/auth", authRoutes);

app.use("/api/course", courseRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/enrollment", enrollmentRoutes);

app.use("/api/wishlist", wishlistRoutes);

app.get("/", (req,res) => {
    res.json({
        message: "stydyhub backend running"
    })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});