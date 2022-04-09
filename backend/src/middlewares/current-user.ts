import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, UserDoc } from "../models/user";

// a more precise definition of what we get back from payload to help augment currentUser to req
interface UserPayload {
    id: string;
    email: string;
    deviceId: string;
}

// augment current user property to req
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserDoc
        }
    }
}

export const currentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    try {

        if (!token) {
            return next();
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
        const user = await User.findOne({ _id: payload.id, token: token }) as UserDoc;

        req.currentUser = user;

    } catch (error) {
        console.error(error);
        console.error(JSON.stringify({
            error: "JWT TOKEN MALFORMED",
            token
        }));
        return next();
    }

    next();

}
