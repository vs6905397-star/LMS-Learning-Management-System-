import User from "../models/User.js"
import Course from "../models/Course.js"

export const addToWishlist = async (req, res) => {
    try {
        const { courseId } = req.params;

        const user = await User.findById(req.user.userId);

        if(!user){
            return res.status(404).json({
                sucess: false,
                message: "user not found"
            })
        }

        const course = await Course.findById(courseId);


        if(!course){
            return res.status(404).json({
                sucess: false,
                message: "course not found"
            })
        }

        if(user.wishlist.includes(courseId)){
            return res.status(400).json({
                sucess: false,
                message: "course already in wishlist"
            })
        }

        user.wishlist.push(courseId);

        await user.save();

         res.status(200).json({
                sucess: true,
                message: "course added to wishlist",
                wishlist: user.wishlist
            })
    } catch (error) {
         res.status(500).json({
                sucess: false,
                message: error.message
            })
    }
}


export const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
        .populate("wishlist");

        if(!user){
            return res.status(404).json({
                sucess: false,
                message: "user not found"
            })
        }

         res.status(200).json({
                sucess: true,                
                wishlist: user.wishlist
            })
    } catch (error) {
        res.status(500).json({
                sucess: false,
                message: error.message
            })
    }
}


export const removeFromWishlist = async (req, res) => {
    try {
        const { courseId } = req.params;

        const user = await User.findById(req.user.userId);

        if(!user){
            return res.status(404).json({
                sucess: false,
                message: "user not found"
            })
        }

        user.wishlist = user.wishlist.filter(
            (id) => id.toString() !== courseId
        );

        await user.save();

        res.status(200).json({
            success: true,
            message: "course removed from wishlist"
        })

    } catch (error) {
        res.status(500).json({
                sucess: false,
                message: error.message
            })
    }
}