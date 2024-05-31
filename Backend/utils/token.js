import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  return token;
};

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw { status: 404, success: false, message: "Token Not Found" };
    }
    await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        throw { status: 401, success: false, message: "Unauthorized" };
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    next(error);
  }
};
