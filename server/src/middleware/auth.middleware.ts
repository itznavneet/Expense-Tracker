import { Response, NextFunction} from "express"
import { verifyToken } from "../utility/jwt"
import { AuthRequest } from "../types/auth.types";
export async function authMiddleware(req:AuthRequest, res:Response, next:NextFunction){
    try {
        const authHeader= req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({
                success: false,
                message: "Token missing"
            })
        }

        const token= authHeader.split(" ")[1];
        const decoded= verifyToken(token) as {
            userId: string
        };
        req.userId= decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
        
    }
    
}