import Review from "../models/Review.js"
import Course from "../models/Course.js"

export const createReview = async (req, res) => {
    try {
 
        const userId = req.user.userId;
        const { courseId, rating, comment} = req.body;

        if(!rating || !comment || !userId || !courseId){
            return res.status(400).json({
                success: false,
                message: "all fields required"
            })
        };

        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        };

        const existingReview = await Review.findOne({
            user: userId,
            course: courseId,
        });

        if(existingReview){
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this course"
            })
        };

        const review = await Review.create({
            user: userId,
            course: courseId,
            rating,
            comment,
        });

        const reviews = await Review.find({ course: courseId });

        const totalRating = reviews.reduce((sum, item) => sum + item.rating, 0);

        course.rating = totalRating / reviews.length;
        course.reviewCount = reviews.length;

        await course.save();

        res.status(201).json({
            success: true,
            message: "review added successfully",
            review,
        })
        
    } catch (error) {
         console.error("create review error:", error);

         res.status(500).json(
            {   
                success: false,
                message: "server error",
            }
        );
    }
}


export const getCourseReview = async (req, res) => {
    try {

        const { courseId } = req.params;

        const review = await Review.find({
            course: courseId,
        }).populate("user", "name dp email").sort({createdAt: -1});

        res.status(200).json({
            success: true,
            count: review.length,
            review,
        });
        
    } catch (error) {
        console.error("get review error:", error);

         res.status(500).json(
            {   
                success: false,
                message: "server error",
            }
        );
    }
}


export const deleteReview = async (req, res) => {
    try {
        
        const { reviewId } = req.params;

        const review = await Review.findById(reviewId);

        if(!review){
            return res.status(404).json({
                success: false,
                message: "review not found",
            })
        }

        if(review.user.toString() !== req.user.userId){
            return res.status(403).json({
                success: false,
                message: "you are not allowed to delete this review",
            })
        }

        await Review.findByIdAndDelete(reviewId);

        const course = await Course.findById(review.course);

        if(course){
            const reviews = await Review.find({course: review.course});

            if(reviews.length === 0){
                course.rating = 0;
                course.reviewCount = 0;
            } else {
                const totalRating = reviews.reduce((sum, item) => sum + item.rating, 0);
                course.rating = totalRating / reviews.length;
                course.reviewCount = reviews.length;
            };
          
            await course.save();   
        }
        
        res.status(200).json({
            success: true,
            message: "review deleted successfully",
         });

    } catch (error) {
        console.error("delete review error:", error);

         res.status(500).json(
            {   
                success: false,
                message: "server error",
            }
        );
    }
}