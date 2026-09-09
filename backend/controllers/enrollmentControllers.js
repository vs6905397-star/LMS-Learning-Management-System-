import Enrollment from "../models/Enrollment.js"
import Course from "../models/Course.js"
import User from "../models/User.js"

export const createEnrollment = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { courseId } = req.body;

        if(!userId || !courseId){
            return res.status(400).json({
                success: false,
                message: "some fields are missing"
            })
        };

        const user = await User.findById(userId);

        if(!user){
            return res.status(401).json({
                success: false,
                message: "user not found"
            })
        };

        const course = await Course.findById(courseId);

        if(!course){
            return res.status(402).json({
                success: false,
                message: "course not found"
            })
        }

        const isAlreadyEnrolled = user.enrolled.some(
            (id) => id.toString() === courseId.toString()
        );

        if(isAlreadyEnrolled){
            return res.status(400).json({
                success: false,
                message: "course already Enrolled"
            })
        }

        const enrollment = await Enrollment.create({
            user: userId,
            course: courseId,
        });

         user.enrolled.push(courseId);
            await user.save();

        course.studentsCount = (course.studentsCount || 0) + 1;
        await course.save();

        res.status(201).json({
            success: true,
            message: "course enrolled successfully",
            enrollment,
        });
        
    } catch (error) {
        console.error("create enrollment error:", error);

         res.status(500).json(
            {   
                success: false,
                message: "server error",
            }
        );
    }
}

export const getMyEnrollment = async (req, res) => {
    try {
        
        const userId = req.user.userId;

        const enrollment = await Enrollment.find({
            user: userId,
        }).populate("course","title description thumbnail curriculum instructor category level rating reviewCount price")
        .sort({enrolledAt: -1});

        res.status(200).json({
            success: true,
            count: enrollment.length,
            enrollment,
        });
        
    } catch (error) {
         console.error("get enrollment error:", error);

         res.status(500).json(
            {   
                success: false,
                message: "server error",
            }
        );
    }
}

export const getEnrollmentById = async (req, res) => {
    try {

        const { enrollmentId } = req.params;

        const enrollment = await Enrollment.findById(enrollmentId).populate("course", "title description thumbnail instructor category level rating reviewCount curriculum");

        if(!enrollment){
            return res.status(404).json(
            {   
                success: false,
                message: "enrollment not found",
            }
        );
        }

        if(enrollment.user.toString() !== req.user.userId){
            return res.status(403).json({
                success : false,
                message: "you are not allowed to acces this enrollment"
            })
        };

        res.status(200).json(
            {   
                success: true,
                enrollment,
            }
        );
        
    } catch (error) {
        console.error("get enrollmentById error:", error);

         res.status(500).json(
            {   
                success: false,
                message: "server error",
            }
        );
    }
}

export const completeLesson = async (req, res) => {
    try {
        
        const { enrollmentId, lessonId } = req.params;
        const userId = req.user.userId;

        const enrollment = await Enrollment.findById(enrollmentId);

        if(!enrollment){
            
            return res.status(404).json({
                success: false,
                message: "enrollment not found"
            })
        };

        
         if(enrollment.user.toString() !== userId.toString()){
            return res.status(403).json({
                success : false,
                message: "you are not allowed to update this enrollment"
            })
        };

        if(!enrollment.completedLessons.includes(lessonId)){
            enrollment.completedLessons.push(lessonId);
        }

        const course = await Course.findById(enrollment.course);

        if(!course){
            return res.status(404).json({
                success : false,
                message: "course not found"
            })
        }

        let totalLessonsCount = 0;

        if(course.curriculum && Array.isArray(course.curriculum)){
            course.curriculum.forEach((chapter)=>{
                if(chapter.lessons && Array.isArray(chapter.lessons)){
                    totalLessonsCount += chapter.lessons.length;
                }
            });
        }

        if(totalLessonsCount >0){
            const calculatedProgress = Math.round(
                (enrollment.completedLessons.length / totalLessonsCount) * 100
            );
            enrollment.progress = Math.min(calculatedProgress, 100);
        }

        let isCourseJustCompleted = false;

        if(enrollment.progress === 100 && !enrollment.completedAt){
            enrollment.completedAt = new Date();
            isCourseJustCompleted = true;

            await User.findByIdAndUpdate(userId, {
                $addToSet: {completedCourses : enrollment.course}
            });
        }

        await enrollment.save();


        return res.status(200).json({
            success: true,
            message: isCourseJustCompleted ? "congratulations! you completed this course" : "lesson marked as completed",
            progress: enrollment.progress,
            completedLessons: enrollment.completedLessons,
            completedAt: enrollment.completedAt,
            
        });
        
    } catch (error) {
         console.error("complete lesson error:", error);

         res.status(500).json(
            {   
                success: false,
                message: "server error",
            }
        );
    }
}