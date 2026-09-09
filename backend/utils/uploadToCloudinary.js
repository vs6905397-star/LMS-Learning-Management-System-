import cloudinary from "../config/cloudinary.js"

const uploadToCloudinary = (
    fileBuffer,
    folder,
    resourceType = "image"
) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            folder,
            resource_type: resourceType,
        },
        (error, result) => {
            if(error){
                reject(error);
            } else {
                resolve(result);
            }
        });

        stream.end(fileBuffer);
    });
};

export default uploadToCloudinary;