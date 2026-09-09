import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connect = await
        mongoose.connect(process.env.MONGO_URL)
        console.log("db connected successfully")

    } catch (error) {
        console.log("connect nahi hua");
        console.log(error.message)
    }
}

export default connectDB