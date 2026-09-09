import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        required: true,
        type: String,
        trim: true,
    },
    email:{
        required: true,
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password:{
        required: true,
        type: String,
        minlangth: 6,
    },
    dp:{
        type: String,
        default: "",
    },
    bio:{
        type: String,
        default: "",
        trim: true,
    },
    wishlist:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }],
    enrolled:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }],
    completedCourses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }]


},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;