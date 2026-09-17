import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from  "jsonwebtoken"
import cloudinary from "../config/cloudinary.js"
import {sendEmail} from "../utils/sendEmail.js"
import uploadToCloudinary from "../utils/uploadToCloudinary.js"


export const signUp = async (req, res) => {
    try {
        const {name, email, password, bio} =  req.body;

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({
                message: "Please enter a valid email address",
                success: false,
            });
        }

        if(!name || !email || !password){
            return res.status(400).json({
                message: "Name, Email, and Password are required",
                success: false,
            });
        };

        const existingUser = await User.findOne({email});

        if(existingUser && existingUser.isVerified){
            return res.status(400).json({
                message: "user already exists",
                success: false,
            });
        };

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

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

        
        let user = existingUser;

        if(user){
            user.name = name;
            user.password = hashPassword;
            user.otp = otp;
            user.otpExpires = otpExpires;
            if(dp) user.dp = dp;
            if(bio) user.bio = bio;

            await user.save();
        } else{
            user = await User.create({
            name,
            email,
            password: hashPassword,
            bio: bio || "",
            dp,
            otp,
            otpExpires,
            isVerified: false,
        });
        }
        
        await sendEmail(email, "Verify Your Email - OTP", `Your OTP for Verifiation is: ${otp}`);

        return res.status(200).json({
            message:"OTP send to your email. please verify to complete signup.",
            sucess: true,
        });

    } catch (error) {
        console.error("SignUp error:",error);

        return res.status(500).json({
            message: "Server error",
            success: false,
        });
        
    }
};


export const verifyOTP = async(req, res) => {
    try {
        const {email, otp} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message: "user not found",
                success: false,
            });
        }

        if(user.isVerified){
            return res.status(400).json({
                message:"user is already verified",
                success: false,
            });
        }

        if(user.otp !== otp || user.otpExpires < Date.now()){
            return res.status(400).json({
                message: "invalid or expired OTP",
                success: false,
            });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

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
            secure: true,
            sameSite: "none",
            maxAge: 7*24*60*60*1000,
        });

        return res.status(200).json({
            message: "Account created successfully",
            success: true,
            user:{
                id: user._id,
                email: user.email,
                name: user.name,
                bio: user.bio,
                dp: user.dp,
            },
        });

    } catch (error) {
        return res.status(500).json({
                message: "server error",
                success: false,
            });
    }
}

export const resendOTP = async (req, res)  => {
    try {
        const {email} = req.body;

        if(!email){
            return res.status(400).json({
                message: "Email is required",
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

        if(user.isVerified){
            return res.status(400).json({
                message: "User is already verified",
                success: false,
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        await sendEmail(email, "Resend - Verify Your Email OTP", `Your new OTP for Verification is: ${otp}`);

         return res.status(200).json({
                message: "OTP has been resent to your email",
                success: true,
            });

    } catch (error) {
        console.log("resend otp error:", error);
        return res.status(500).json({
            message:"server error",
            success:false,
        })
    }
}

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


        if(!user.isVerified){
            return res.status(400).json({
                message: "Please verify your email first",
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
            secure: true,
            sameSite: "none",
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
        
        res.clearCookie("token", {
            httpOnly: true,
           secure: true,
            sameSite: "none",
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

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if(!email){
            return res.status(400).json({
                message: "Email is required",
                success: false,
            });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message: "user not found",
                success: false,
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        await sendEmail(email,
             "Password Reset OTP",
            `Your OTP for resetting Password is: ${otp}. it will expire in 10 minutes.`
            );

        return res.status(200).json({
            message: "Reset OTP send to your email",
            success: true,
        });

     } catch (error) {
        console.error("forgot password error");

        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
} 
  

export const verifyResetOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if(!email || !otp){
            return res.status(400).json({
                message: "Email and OTP are required",
                success: false,
            });
         }
 
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message: "user not found",
                success: false,
            });
        }

        if(user.otp !== otp || user.otpExpires < Date.now()){
             return res.status(400).json({
                message: "Invalid or expired OTP",
                success: false,
            });
        }
 
        const resetToken = jwt.sign(
            {
                 userId: user._id ,
                 email: user.email,

            },
            process.env.JWT_SECRET,
            { expiresIn: "15m"}
        );

        user.otp = null;
        user.otpExpires = null;
        await user.save();

         return res.status(200).json({
                 message: "OTP verified Successfully. Proceed to reset password.",
                success: true,
                resetToken,
            });

    } catch (error) {
        console.error("verifyResetOtp error");

        return res.status(500).json({
             message: "Server error",
            success: false,
        });
    }
}
 
export const resetPassword = async (req, res) => {
    try {
 
        const { resetToken, newPassword } = req.body;

        if(!resetToken || !newPassword){
            return res.status(400).json({
            message: "Reset token and new password are required",        
            success: false,
        });
        }

        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET) ;
        const user =  await User.findById(decoded.userId);
 
        if(!user){
            return res.status(400).json({
            message: "user not found or invalid token",
            success: false,
        });
        } 

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

         return res.status(200).json({
            message: "Password reset Successfully",
            success: true,
        });
        
    } catch (error) {
        console.error("resetPassword error");

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