import express, { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import { BadRequestError } from '../../errors/bad-request-error';
import { User } from '../../models/user';
import { NotFoundError } from '../../errors/not-found-error';

const handler = async (req: Request, res: Response) => {

  const user = req.currentUser;

  if (!user) {
    throw new NotFoundError();
  }


  user.set("wasLoggedIn", false);

  user.set("token", null);
  user.set("fcmToken", null);

  await user.save();


  res.status(StatusCodes.OK).send();
};



export {
  handler as signOutHandler,
};
