import express, { NextFunction, Request, Response } from 'express';
import { check, CustomValidator, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt'
import { BadRequestError } from '../../errors/bad-request-error';
import { Image } from '../../models/image';
import { NotFoundError } from '../../errors/not-found-error';
import { NotAuthorizedError } from '../../errors/not-authorized-error';
import Filter from 'bad-words';
import { UserActivity } from '../../models/user-activity';
import { Comment } from '../../models/comment';
import { UserNotification } from '../../models/user-notification';
import { Like } from '../../models/like';
import { reactionTypes } from '../../utils/reactionTypes';
const filter = new Filter();

const handler = async (req: Request, res: Response) => {

  const { reactionType, imageId } = req.body;

  const existingUser = req.currentUser;

  if (!existingUser) {
    throw new NotAuthorizedError();
  }

  const [userActivity, like, image] = await Promise.all([
    UserActivity.findById(existingUser._id),
    Like.findOne({ imageId }),
    Image.findById(imageId)
  ])


  if (!like || !userActivity || !image) {
    throw new NotFoundError()
  }


  if (reactionType === reactionTypes.celebrate) {
    like.celebrate.push(existingUser._id)
  }

  if (reactionType === reactionTypes.crying) {
    like.crying.push(existingUser._id)
  }

  if (reactionType === reactionTypes.emotional) {
    like.emotional.push(existingUser._id)
  }

  if (reactionType === reactionTypes.heart) {
    like.heart.push(existingUser._id)
  }

  if (reactionType === reactionTypes.laugh) {
    like.laugh.push(existingUser._id)
  }

  if (reactionType === reactionTypes.like) {
    like.like.push(existingUser._id)

  }

  const userNotification = await UserNotification.findById({
    userId: like.userId
  })

  await like.save()
  userNotification?.notifications.push({
    likeId: like._id,
    date: new Date(),
    userId: existingUser._id,
    imageId
  })

  userActivity.likes.push(like._id);

  image.likesCount = image.likesCount + 1;
  await userNotification?.save()
  await userActivity.save()

  res.status(StatusCodes.CREATED).send(like._id);
};


const validator = [
  check('reactionType')
    .trim()
    .notEmpty(),
  check('imageId')
    .trim()
    .notEmpty()
    .isMongoId()
]

export {
  handler as reactToImageHandler,
  validator as reactToImageValidator,
};
