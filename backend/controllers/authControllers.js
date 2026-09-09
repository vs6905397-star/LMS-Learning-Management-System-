import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from  "jsonwebtoken"
import cloudinary from "../config/cloudinary.js"
import uploadToCloudinary from "../utils/uploadToCloudinary.js"


export const signUp = async (req, res) => {
    try {
        const {name, email, password, bio} =  req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message: "Name, Email, and Password are required",
                success: false,
            });
        };

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message: "user already exists",
                success: false,
            });
        };

        const hashPassword = await bcrypt.hash(password, 10);

        let dp = "";

        if(req.file){
            const result = await uploadToCloudinary(
                req.file.buffer,
                "studyhub/users",
                "image"
            );

            dp = result.secure_url;
        }

        

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            bio: bio || "",
            dp,
        });

        const token = jwt.sign({
            userId: user._id,
        },
         process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d",
        }
    );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            samesite: "lax",
            maxAge: 7*24*60*60*1000,
        });

        return res.status(200).json({
            message: "Account created successfully",
            user:{
                id: user._id,
                email: user.email,
                name: user.name,
                bio: user.bio,
                dp: user.dp,
            },
        });

    } catch (error) {


        console.error("SignUp error");

        return res.status(500).json({
            message: "Server error",
            success: false,
        });
        
    }
};


export const login = async (req, res) => {
    try {
        
        const { email, password} = req.body;

        if( !email || !password ){
             return res.status(400).json({
                message: "Email and Password are required",
                success: false,
            });
        }

        const user = await User.findOne({email});

        if(!user){
             return res.status(400).json({
                message: "invalid Email or Password",
                success: false,
            });
        }

        const isPasswordCorrect = bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({
                message: "invalid Email or Password",
                success: false,
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "7d",
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            samesite: "lax",
            maxAge: 7*24*60*60*1000,
        });

        return res.status(200).json({
            message: "Login successfully",
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio,
                dp: user.dp,
            }
        });


    } catch (error) {
        console.error("Login error");

        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}


export const logout = async (req, res) => {
    try {
        
        res.clearCookie("tooken", {
            httpOnly: true,
            secure: false,
            samesite: "lax",
        });

        return res.status(200).json({
            message: "Logout successfully",
            success: true,
        })
    } catch (error) {
        console.error("Logout error");

        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}

export const getProfile = async(req, res) => {
    try {
        
        const userId = req.user.userId;

        const user = await User.findById(userId).select("-password");

        if(!user){
            return res.status(500).json({
            message: "user not found",
            success: false,
        });
        }

        res.status(201).json({
            succrss: true,
            user,
        })
    } catch (error) {
         console.error("getprofile error:",error);

        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId);

        if(!user){
            return res.status(500).json({
            message: "user not found",
            success: false,
        });
        }

        if(req.body.name){
            user.name = req.body.name;
        }

        if(req.body.bio){
            user.bio = req.body.bio;
        }

        if(req.file){
            const result = await uploadToCloudinary(
                req.file.buffer
            );

            user.dp = result.secure_url;
        }
        
        await user.save();

        res.status(200).json({
            succrss: true,
            message: "profile updated successfully",
            user:{
                ...user.toObject(),
                password: undefined,
            }
        })

    } catch (error) {
        console.error("updateprofile error:",error);

        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}

export const getCompletedCourse = async  (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId).populate({
            path:"completedCourses",
            select:"title thumbnail description category level instructor curriculum"
        });

        if(!user){
            return res.status(404).json({
                success: false,
                message:"user not found"
            })
        }

        return res.status(200).json({
            success: true,
            completeCourse: user.completedCourses
        });
        
    } catch (error) {
        console.error("getCompletedCourse error:",error);

        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}