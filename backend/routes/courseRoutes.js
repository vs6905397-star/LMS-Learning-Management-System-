import express from "express"
import upload from "../middleware/upload.js"
import { createCourse, deleteCourse, getAllCourses, getSingleCourse, uploadLessonVideo } from "../controllers/courseControllers.js"

const routes = express.Router();

routes.post("/", upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "instructorImage", maxCount: 1 },
  ]),
   createCourse);

routes.get("/", getAllCourses);

routes.get("/:id", getSingleCourse);

routes.delete("/:id", deleteCourse);

routes.patch("/:lessonId/video", upload.single("video"), uploadLessonVideo);

export default routes;