import express, { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import { BadRequestError } from '../../errors/bad-request-error';
import { User } from '../../models/user';

const handler = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const existingUser = await User.findByCredentials(email, password, next);

  if (!existingUser) {
    return next(new BadRequestError('Invalid Credentials'));
  }

  await existingUser.save();


  //generate jwt
  const userJwt = await existingUser.generateAuthToken();
  res.status(StatusCodes.OK).send({ ...existingUser.toJSON(), token: userJwt });

};

const validator = [
  check('email')
    .trim()
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('provide a valid email address'),
  check('password')
    .not()
    .isEmpty()
    .withMessage(
      'provide a password'
    )
];

export {
  handler as signInHandler,
  validator as signInValidator,
};
