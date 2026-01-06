import jwt from "jsonwebtoken";

const getJwtSecret = () => process.env.JWT_SECRET;

export const generateToken = (userId) => {
  const secret = getJwtSecret();
  if (!secret) throw new Error("JWT_SECRET is not configured");
  return jwt.sign({ userId }, secret, { expiresIn: "7d" });
};

export const verifyToken = (token) => {
  try {
    const secret = getJwtSecret();
    if (!secret) return null;
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};
