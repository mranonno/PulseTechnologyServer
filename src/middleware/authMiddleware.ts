// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User, { IUser } from "../models/User";

// Extend Request to hold `user`
export interface AuthRequest extends Request {
  user?: IUser;
}

// ========================
// PROTECT (Authentication)
// ========================
export const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    // Check if Authorization header exists and starts with Bearer
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      try {
        // Extract token
        token = req.headers.authorization.split(" ")[1];

        if (!process.env.JWT_SECRET) {
          throw new Error("JWT_SECRET not configured");
        }

        // Verify token
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET
        ) as JwtPayload & {
          id: string;
        };

        // Find user by ID without password
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
          res.status(401);
          throw new Error("User not found");
        }

        req.user = user;
        return next();
      } catch (error) {
        console.error("Auth Error:", error);
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
    }

    res.status(401);
    throw new Error("Not authorized, no token provided");
  }
);

// ========================
// AUTHORIZE (Role-based Access)
// ========================
export const authorize =
  (...roles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authenticated");
    }

    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("Not authorized to access this resource");
    }

    next();
  };
