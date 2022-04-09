import express, { NextFunction, Request, Response } from 'express';
import { check, CustomValidator, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt'
import { BadRequestError } from '../../errors/bad-request-error';
import { User } from '../../models/user';
import { NotFoundError } from '../../errors/not-found-error';
import { NotAuthorizedError } from '../../errors/not-authorized-error';
import Filter from 'bad-words';
const filter = new Filter();

const handler = async (req: Request, res: Response) => {

  const { email, firstName, lastName, username, newPassword, oldPassword } = req.body;

  const existingUser = req.currentUser;

  if (!existingUser) {
    throw new NotAuthorizedError();
  }



  if (email) {
    existingUser.set("validatedEmail", false)

    existingUser.set("email", email);
  }

  if (firstName) existingUser.set("firstName", firstName);
  if (lastName) existingUser.set("lastName", lastName);
  if (username) existingUser.set("username", username);
  if (newPassword) {
    if (!oldPassword) throw new BadRequestError('Your old password was entered incorrectly');
    const isMatch = await bcrypt.compare(existingUser.password || '', oldPassword);

    if (!isMatch) throw new BadRequestError('Your old password was entered incorrectly');

    existingUser.set("password", newPassword);
  }

  await existingUser.save();

  let userJwt;

  if (newPassword) {
    userJwt = await existingUser.generateAuthToken();
  }

  res.status(StatusCodes.OK).send({
    ...existingUser.toJSON(), token: userJwt
  } || null);


};


const validator = [
  check('email')
    .isEmpty().withMessage("can't change primary email"),
  check('firstName')
    .trim()
    .optional()
    .custom((data) => { return !filter.isProfane(data) })
    .isLength({ min: 1, max: 50 }).withMessage('firstName can only have alphabets'),
  check('lastName')
    .trim()
    .optional()
    .custom((data) => { return !filter.isProfane(data) })
    .isLength({ min: 1, max: 50 }).withMessage('lastName can only have alphabets'),
  check('username')
    .trim()
    .optional()
    .custom((data) => { return !filter.isProfane(data) })
    .isLength({ min: 1, max: 50 }).withMessage('lastName can only have alphabets'),
  check('newPassword')
    .optional()
    .isLength({ min: 7, max: 30 })
    .not()
    .contains('password')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/)
    .withMessage(
      'Your password does not match the password rules '
    ),
  check('oldPassword')
    // if the new password is provided...
    // OR
    .if(check('newPassword').exists())
    // ...then the old password must be too...
    .notEmpty()
    // ...and they must not be equal.
    .custom((value, { req }) => value !== req.body.newPassword).withMessage("Old password can't be equal to new password"),
];

export {
  handler as updateUserHandler,
  validator as updateUserValidator,
};
