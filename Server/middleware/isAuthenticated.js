import jwt from "jsonwebtoken";

export const authenticationMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        message: "user dont have token, log in first",
        success: false,
      });
    }
    const decodeUser = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decodeUser) {
      return res.status(401).json({
        message: "invalid token",
        success: false,
      });
    }
    req.id = decodeUser.userId;
    next();
  } catch (error) {
    console.log("error in authentication middleware ", error);
    return res.status(401).json({
      message: "unauthorized",
      success: false,
    });
  }
};
