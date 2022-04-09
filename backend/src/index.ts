import dotenv from 'dotenv'
import fs from "fs"
dotenv.config();

import { app } from './app'

import mongoose from "mongoose";
import { NotFoundError } from './errors/not-found-error';
import { NextFunction, Request, Response } from "express";
// import { getCollectionNames } from './db/collections_names';

const start = async () => {
  console.info('starting up ......');
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET must be defined");

  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");

  }


  try {
    await mongoose.connect(process.env.MONGO_URI)

    console.info("connected to mongodb")
  } catch (e) {
    console.error(e);
    console.log(e);
  }

  app.listen(process.env.PORT || 8080, () => {
    console.error("console working")
    console.info(`NODE_ENV ${process.env.NODE_ENV} HOST_ENV ${process.env.HOST_ENV} services running on port ${process.env.PORT}`);
  })
}

process.on('SIGINT', () => { console.info("Bye bye!"); process.exit(); });
start();
