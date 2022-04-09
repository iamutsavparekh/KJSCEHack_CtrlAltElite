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
import mongoose from "mongoose";
import { Image } from '../../models/image'
import { NotFoundError } from "../../errors/not-found-error";

const handler = async (req: Request, res: Response) => {

  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  if (!req.file) {
    throw new BadRequestError("Please provide a valid image");
  }

  if (!mongoose.isValidObjectId(req.params.imageId)) {
    throw new BadRequestError("Provide valid image id");
  }

  const image = await Image.findById(req.params.imageId);

  if (!image) {
    throw new NotFoundError()
  }
  //use sharp to format image
  const buffer = await sharp(req.file.buffer)
    .png()
    .toBuffer();


  image.set("image", buffer);


  await image.save();
  res.status(StatusCodes.OK).send();

};

export { handler as uploadImageHandler };