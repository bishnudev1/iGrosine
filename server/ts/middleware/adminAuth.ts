import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
  admin?: JwtPayload;
}

const extractAdminFromCookie = (req: CustomRequest, res: Response, next: NextFunction) => {
  // Extract the token from the cookie
  const token = req.cookies.adminToken as string;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Missing token"
    });
  }

  try {
    // Verify the token and extract admin information
    const decoded = jwt.verify(token, "process.env.JWT_SECRET") as JwtPayload;
    req.admin = decoded; // Attach admin information to the request object
    next();
  } catch (error: any) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token"
    });
  }
};

export default extractAdminFromCookie;
