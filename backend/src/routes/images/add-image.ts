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
import { UserActivity } from '../../models/user-activity';
import { Image } from '../../models/image';
import { UserNotification } from '../../models/user-notification';
import { Comment } from '../../models/comment';
import { Like } from '../../models/like';
const filter = new Filter();

const handler = async (req: Request, res: Response) => {

  const { description, originalImage, imageTitle, imageType } = req.body;

  const existingUser = req.currentUser;

  if (!existingUser) {
    throw new NotAuthorizedError();
  }

  const originalImageExists = await Image.findById(originalImage);

  if (!existingUser) {
    throw new BadRequestError("Original image does not exists");
  }
  let img = Image.build({
    imageTitle,
    imageType,
    userId: existingUser._id,
    description,
    originalImage
  })

  await img.save()

  const comment = Comment.build({
    comments: [],
    imageId: img._id,
    userId: existingUser.id
  })

  await comment.save()

  const like = Like.build({
    imageId: img._id,
    userId: existingUser._id,
    like: [],
    laugh: [],
    heart: [],
    emotional: [],
    crying: [],
    celebrate: []
  })

  await like.save()
  res.status(StatusCodes.CREATED).send({ id: img._id })
};


const validator = [
  check('imageType')
    .trim()
    .notEmpty(),
  check('imageTitle')
    .trim()
    .notEmpty(),
  check('description')
    .trim()
    .optional()
    .isAlphanumeric(),
  check('originalImage')
    .optional()
    .isMongoId()

]

export {
  handler as addImageHandler,
  validator as addImageValidator,
};
