import nodemailer from "nodemailer";

export const sendEmail = async(email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent success");

    } catch (error) {
        console.error("email not sent:", error);
        throw error;
    }
};