import mongoose from "mongoose"

const lessonSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        default: "",
    },
    duration:{
        type: String,
        default: "",
    },
    whatYouLearn:{
        type: [String],
        default: [],     
    },
    videoUrl: {
        type: String,
        default: "",
    }
},{_id: true});


const chapterSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    lessons: {
        type: [lessonSchema],
        default: [],
    }
},{_id: true});


const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        default: "",
    },
    thumbnail:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
        min: 0,
    },
    category:{
        type: String,
        required: true,
        trim: true,
    },
    level:{
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true,
    },
    instructor:{
        name:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            default: "",
        },
        experiemce:{
            type: String,
            default: "",
        },
        qualification:{
            type: String,
            default: "",
        },
        skills:{
            type: [String],
            default: [],
        },
        image:{
            type: String,
            default: "",
        },
    },

    requirments:{
        type:  [String],
        default: [],
    },
    whatYouLearn:{
        type: [String],
        default:"",
    },
    curriculum:{
        type: [chapterSchema],
        default: [],
    },
    rating:{
        type: Number,
        default: 0,
        min: 0,
        max:5,
    },
    studentsCount:{
        type: Number,
        default: 0,
    },
    faqs:[
        {
            question:{
                type: String,
                required: true,
            },
            answer:{
                type: String,
                required: true,
            },
        },
    ],
},{timestamps: true});

const Course = mongoose.model("Course", courseSchema);

export default Course;