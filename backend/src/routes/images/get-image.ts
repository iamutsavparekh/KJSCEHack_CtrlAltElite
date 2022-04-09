import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';
import { NotAuthorizedError } from "../../errors/not-authorized-error";
import { BadRequestError } from "../../errors/bad-request-error";
import { Image } from "../../models/image";
import { NotFoundError } from "../../errors/not-found-error";

const handler = async (req: Request, res: Response) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  if (!mongoose.isValidObjectId(req.params.imageId)) {
    throw new BadRequestError("Provide valid imageId");
  }
  const image = await Image.findById(req.params.imageId);
  if (!image || !image.image) {
    throw new NotFoundError()
  }
  res.set('Content-Type', 'image/png');
  res.status(StatusCodes.OK).send(image.image);

};

export { handler as imageHandler };