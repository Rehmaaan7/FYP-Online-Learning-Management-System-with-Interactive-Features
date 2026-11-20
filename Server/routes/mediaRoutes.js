import express from "express"
import upload from "../utils/multer.js"
import { uploadMedia, uploadVideo } from "../utils/cloudinary.js"




const router = express.Router()

router.route("/video").post(upload.single("file"),async (req, res) => {
    try {
        
        if (!req.file) {
            return res.status(400).json({
                message:" no video added"
            })
            
        }
        const file = req.file.path
        const uploadFile = await uploadVideo(file)

        return res.status(200).json({
            success:true,
            message:"video uploaded successfully",
            data:uploadFile
        })

        
    } catch (error) {
        console.log("error from uploading file controller: ", error)
        return res.status(500).json({
            success:false,
            message:"uplading video failed"
        })
        
    }
    
})

export default router;