import express, { NextFunction, Request, Response } from "express";

import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';
import { NotFoundError } from "../../errors/not-found-error";
import { User } from "../../models/user";

const handler = async (req: Request, res: Response) => {
  const user = req.currentUser;

  if (!user) {
    throw new NotFoundError();
  }

  await User.findByIdAndDelete(user.id)

  res.status(StatusCodes.NO_CONTENT).send();
};

export { handler as deleteUserHandler };