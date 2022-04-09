import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
import { NotAuthorizedError } from "../../errors/not-authorized-error";
import { BadRequestError } from "../../errors/bad-request-error";
import { User } from "../../models/user";
import { NotFoundError } from "../../errors/not-found-error";

const handler = async (req: Request, res: Response) => {
    if (!req.currentUser) {
        throw new NotAuthorizedError();
    }
    if (!mongoose.isValidObjectId(req.params.userId)) {
        throw new BadRequestError("Provide valid user id");
    }
    const user = await User.findById(req.params.userId);
    if (!user || !user.avatar) {
        throw new NotFoundError()
    }
    res.set('Content-Type', 'image/png');
    res.status(StatusCodes.OK).send(user.avatar);

};

export { handler as userAvatarHandler };