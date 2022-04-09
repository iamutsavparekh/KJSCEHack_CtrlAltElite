import express, { NextFunction, Request, Response } from 'express';
import { check, CustomValidator, param, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt'
import { BadRequestError } from '../../errors/bad-request-error';
import { User } from '../../models/user';
import { NotFoundError } from '../../errors/not-found-error';
import { NotAuthorizedError } from '../../errors/not-authorized-error';
import Filter from 'bad-words';
import { Image } from '../../models/image';
const filter = new Filter();

const handler = async (req: Request, res: Response) => {


  const existingUser = req.currentUser;

  if (!existingUser) {
    throw new NotAuthorizedError();
  }


  const images = await Image.find({})



  res.status(StatusCodes.OK).send(images);


};



export {
  handler as getFeedHandler,
};
