import express, { NextFunction, Request, Response } from "express";

import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';

const handler = async (req: Request, res: Response) => {

    res.status(StatusCodes.OK).send(req.currentUser);
};

export { handler as currentUserHandler };