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
const filter = new Filter();

const handler = async (req: Request, res: Response) => {

  const { comment, imageId } = req.body;

  const existingUser = req.currentUser;

  if (!existingUser) {
    throw new NotAuthorizedError();
  }

  const [userActivity, comments, image] = await Promise.all([
    UserActivity.findById(existingUser._id),
    Comment.findOne({ imageId }),
    Image.findById(imageId)
  ])


  if (!comments || !userActivity || !image) {
    throw new NotFoundError()
  }



  comments.comments.push({
    comment,
    userId: existingUser._id,
    date: new Date()
  })

  const userNotification = await UserNotification.findById({
    userId: comments.userId
  })

  await comments.save()
  userNotification?.notifications.push({
    commentId: comments._id,
    date: new Date(),
    userId: existingUser._id,
    imageId
  })

  userActivity.comments.push(comments._id);

  image.commentsCount = image.commentsCount + 1;
  await userNotification?.save()
  await userActivity.save()

  res.status(StatusCodes.CREATED).send(comments._id);
};


const validator = [
  check('comment')
    .trim()
    .optional()
    .custom((data) => { return !filter.isProfane(data) })
    .isLength({ min: 1, max: 5000 }).withMessage('please enter appropriate comment'),
  check('imageId')
    .trim()
    .notEmpty()
    .isMongoId()
]

export {
  handler as postCommentHandler,
  validator as postCommentValidator,
};
