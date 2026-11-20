import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"
import upload from "multer"


dotenv.config({})
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET_KEY
})

export const uploadMedia = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
    });

    return result;
  } catch (error) {
    console.log("error in uploadMedia : ", error);
    
  }
};

export const deleteMedia = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId)
        if (result.result !=="ok") {
          return null
        }
    } catch (error) {
        console.error("error occoured in deleteMedia ",error)
        throw new errorHandler("");
        
    }
}



export const uploadVideo = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "video",
      // chunk_size: 6000000, // 6MB chunks
    });

    return result;
  } catch (error) {
    console.log("error in upload video : ", error);
    
  }
};



export const deleteVideo = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId,{
            resource_type:"video"
        })
    } catch (error) {
        console.log("error occoured in deleteVideo: ", error)
    }
    
}

export const uploadDocument = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
    });

    return result;
  } catch (error) {
    console.log(error);
   
  }
};

export const deleteDocument = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId,{
      resource_type:"raw"
    })
    
  } catch (error) {
    console.log(error)
  }
}

