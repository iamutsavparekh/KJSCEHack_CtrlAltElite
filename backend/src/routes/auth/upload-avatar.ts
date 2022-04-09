import express, { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';
import { NotAuthorizedError } from "../../errors/not-authorized-error";
import { BadRequestError } from "../../errors/bad-request-error";
interface MulterRequest extends Request {
  file: any;
}

const handler = async (req: Request, res: Response) => {

  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  if (!req.file) {
    throw new BadRequestError("Please provide a valid image");
  }

  //use sharp to format image
  const buffer = await sharp(req.file.buffer)
    .rotate()
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();

  req.currentUser.set("avatar", buffer);
  await req.currentUser.save();
  res.status(StatusCodes.OK).send();

};

export { handler as uploadAvatarHandler };