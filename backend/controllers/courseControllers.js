import Course from "../models/Course.js"
import uploadToCloudinary from "../utils/uploadToCloudinary.js"


export const createCourse = async (req, res) => {
    try {
        
        const {title, description,
             price, category, level, instructor,
              requirments, whatYouLearn, curriculum, faqs} = req.body;

        if(!title || !description || !category || !level){
            return res.status(400).json({
                success: false,
                message: "Required course fields are missing",
            });
        };

        let thumbnail = "";

        if(req.files?.thumbnail?.[0]){
            const result = await uploadToCloudinary(
                req.files.thumbnail[0].buffer,
                "studyhub/courses",
                "image"
            );

            thumbnail = result.secure_url;
        }

        let instructorImage = "";

        if(req.files?.instructorImage?.[0]){
            const result = await uploadToCloudinary(
                req.files.instructorImage[0].buffer,
                "studyhub/courses",
                "image"
            );

            instructorImage = result.secure_url;
        }

        let instructorData = {};

        if(instructor){
            instructorData = JSON.parse(instructor);
        }

        const course = await Course.create({
            title,
            description,
            price: price || 0,
            category,
            thumbnail,
            instructor:{
                ...instructorData,
                image: instructorImage,
            },
            level,
            requirments: requirments || [],
            whatYouLearn: whatYouLearn || [],
            curriculum: curriculum || [],
            faqs: faqs || [],
        });

        res.status(201).json(
            {   
                success: true,
                message: "course created successfully",
            }
        );

    } catch (error) {
        console.error("create course error:", error);

         res.status(500).json(
            {   
                success: false,
                message: "server error",
            }
        );

    }
};



export const deleteCourse = async (req, res) => {
    try {
        
        const { id } = req.params;

        const course = await Course.findByIdAndDelete(id);

        if(!course){
            return res.status(404).json({
                message: "course not found",
                success: false,
            });
        };

        res.status(200).json({
            success: true,
            message: "course deleted successfully",
        });

    } catch (error) {
        console.error("delete course error:", error);

         res.status(500).json(
            {   
                success: false,
                message: "server error",
            }
        );

    };
};


export const getAllCourses = async (req, res) => {
    try {

        const {search = "", category, level, page = 1, limit = 9} = req.query;

        const query = {};

        if(search.trim()){
            query.title = {
                $regex: search.trim(),
                $options: "i",
            };
        }

        if(category){
            query.category = category;
        }
        
        if(level){
            query.level = level;
        }

        const skip = (page-1) * limit;


        const courses = await Course.find(query).sort({ createdAt: -1,}).skip(skip).limit(Number(limit));

        const totalCourse = await Course.countDocuments(query);

        res.status(200).json(
            {   
                success: false,
                count: courses.length,
                 totalCourse,
                 currentPage:Number(page),
                 totalPages:Math.ceil(totalCourse/limit),
                courses,
            });

    } catch (error) {
        console.error("getAllCourses error:", error);

         res.status(500).json(
            {   
                success: false,
                message: "server error",
            }
        );

    }
}

export const getSingleCourse = async (req, res) => {
    try {
        
        const { id } = req.params;

        const course = await Course.findById(id);

        if(!course){
            return res.status(404).json({
                message: "course not found",
                success: false,
            })
        };

        res.status(200).json({
            success: true,
            course,
        });
        
    } catch (error) {
        console.error("getSingleCourses error:", error);

         res.status(500).json(
            {   
                success: false,
                message: "server error",
            }
        );
    }
}

export const uploadLessonVideo = async (req, res) => {
    try {
        
        const { lessonId } = req.params;

        if(!req.file){
            return res.status(400).json(
            {   
                success: false,
                message: "video is required",
            })
        }

        const lesson = await lesson.findById(lessonId);

        if(!lesson){
            return res.status(404).json(
            {   
                success: false,
                message: "lesson not found",
            })
        }

        const result = await uploadToCloudinary(
            req.file.buffer,
            "lessons/videos",
            "video"
        );

        lesson.video = result.secure_url;

        await lesson.save();

        res.status(200).json(
            {   
                success: true,
                message: "video uploaded successfully",
                video: lesson.video,
            })

    } catch (error) {
        console.error("videoupload error:", error);

         res.status(500).json(
            {   
                success: false,
                message: "server error",
            }
        );
    }
}