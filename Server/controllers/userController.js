import { User } from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { generateTOken } from "../utils/generate.token.js";
import { deleteMedia, uploadMedia } from "../utils/cloudinary.js";
import { response } from "express";

export const SignUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "all feilds are required",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "email already exists",
      });
    }
    const hashedPass = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPass,
      role,
    });
    return res.status(201).json({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    console.log("error occured in signup : ", error);
    return res.status(500).json({
      success: false,
      message: "registeration failed",
    });
  }
};

export const LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "all fiels are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "invalid username or password",
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "invalid username or password",
      });
    }

    generateTOken(res, user, `wellcome back ${user.name}`);
  } catch (error) {
    console.log("error occured in signup : ", error);
    return res.status(500).json({
      success: false,
      message: "logging in failed",
    });
  }
};

export const LogOut = (req, res) => {
  try {
    return res.status(201).cookie("token", "", { maxAge: 0 }).json({
      message: "logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log("error occured in logging out : ", error);
    return res.status(500).json({
      success: false,
      message: "logging out failed",
    });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log("error occured in gettin user profile : ", error);
    return res.status(500).json({
      success: false,
      message: "getting user profile failed",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const {name}  = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }

    let photoUrl = user.photoUrl;

    if (profilePhoto) {
      if (user.photoUrl) {
        const publicId = user.photoUrl.split("/").pop().split(".")[0];
        await deleteMedia(publicId);
      }
      console.log("REQ.FILE:", req.file);
      const filePath = profilePhoto.path.replace(/\\/g, "/");

      const cloudResponse = await uploadMedia(filePath);
      // const cloudResponse = await uploadMedia(profilePhoto.path);

      if (!cloudResponse) {
        return res.status(500).json({
          success: false,
          message: "Image upload failed",
        });
      }

      photoUrl = cloudResponse.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
  userId,
  { name, photoUrl },
  { returnDocument: "after" } 
).select("-password");

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "user updated successfully",
    });
  } catch (error) {
    console.log("error in updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "updation of profile failed",
    });
  }
};

// export const updateProfile =async (req, res) => {
//   try {
//     const userId = req.id
//     const {name} = req.body
//     const profilePhoto = req.file

//     const user = await User.findById(userId)

//     if (!user) {
//       return res.status(404).json({
//         message:"user not found",
//         success:false
//       })

//     }
//     if (user.photoUrl) {
//       const publicId = user.photoUrl.split("/").pop().split(".")[0] // extracting public id
//       deleteMedia(publicId)

//     }
//     const cloudResponse = await uploadMedia(profilePhoto.path)
//     const photoUrl = cloudResponse.secure_url

//     const updatedData = {name, photoUrl}
//     const updatedUser = await User.findByIdAndUpdate(userId,updatedData,{new:true}).select("-password")
//     return res.status(200).json({
//       success:true,
//       user:updatedUser,
//       message:"user updated successfully"
//     })

//   } catch (error) {
//      console.log("error occured in gettin user profile : ", error);
//     return res.status(500).json({
//       success: false,
//       message: "updation of profile failed"
//   })
//   }

// }
