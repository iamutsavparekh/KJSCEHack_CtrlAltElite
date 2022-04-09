import express, { NextFunction, Request, Response } from 'express';
import { check, CustomValidator, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../../errors/bad-request-error';
import { User } from '../../models/user';
import { NotFoundError } from '../../errors/not-found-error';
import { NotAuthorizedError } from '../../errors/not-authorized-error';

const handler = async (req: Request, res: Response) => {

  const { newPassword } = req.body;

  const existingUser = req.currentUser;

  if (!existingUser) {
    throw new NotAuthorizedError();
  }


  const isMatch = await bcrypt.compare(existingUser.password!, newPassword);
  if (isMatch) {
    throw new BadRequestError("Your new password can't be equal to the old password");
  }

  existingUser.set("password", newPassword);


  await existingUser.save();

  res.status(StatusCodes.OK).send();

};


const validator = [
  check('newPassword')
    .optional()
    .isLength({ min: 7, max: 30 })
    .not()
    .contains('password')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/)
    .withMessage(
      'Your password does not match the password rules '
    )
];

export {
  handler as resetPasswordHandler,
  validator as resetPasswordValidator,
};
