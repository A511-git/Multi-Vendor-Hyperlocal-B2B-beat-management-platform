import { v2 as cloudinary } from 'cloudinary'
import fs from "node:fs"
import { ApiError } from '../../utils/apiError';
import { retry } from '../../utils/retry';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_KEY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export const cloudinaryImageUpload = async ({ filePath }) => {
    try {
        if (!filePath)
            throw new ApiError(400, "File Path not present")
        const result = await retry(
            () => cloudinary.uploader.upload(filePath, { resource_type: "auto" }),
            3,
            300
        )
        if (!result || !result.secure_url)
            throw new ApiError(400, "Cloudinary upload failed — no secure_url returned.");

        fs.unlinkSync(filePath);
        return {
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
        }
    } catch (error) {
        fs.unlinkSync(filePath);
        throw (error instanceof ApiError) ? error : new ApiError(500, "Internal Server Error")
    }
}