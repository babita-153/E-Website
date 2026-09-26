import { verifyAccessToken } from "../utils/auth.util.js";

export const authenticate = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({
      message: "access token required",
    });
  }
  try {
    let decoded = verifyAccessToken(accessToken);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "access token expired",
    });
  }
};
