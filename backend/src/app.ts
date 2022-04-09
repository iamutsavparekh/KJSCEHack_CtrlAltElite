import express, { NextFunction, Request, Response } from "express";

import 'express-async-errors'; // to use throw in async functions
import cors from 'cors'
import helmet from 'helmet';
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentUser } from "./middlewares/current-user";
import { CustomError } from "./errors/custom-error";
import { StatusCodes } from "http-status-codes";
import { requireAuth } from "./middlewares/require-auth";
import { NotAuthorizedError } from "./errors/not-authorized-error";
import { authRouter } from "./routes/auth";
import { commentsRouter } from "./routes/comments";
import { imageRouter } from "./routes/images";
import { likeRouter } from "./routes/likes";

const app = express();

app.use(helmet());
app.use(express.json());

app.use(cors());
// const options = {
//   origin: 'http://127.0.0.1:3000',
// };
// app.options(options, cors());

app.set('trust proxy', true);


app.use(currentUser)

app.use("/users", authRouter);
app.use("/comments", commentsRouter);
app.use("/images", imageRouter);
app.use("/likes", likeRouter);


// if route does not exist
app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  console.info("Route not found")
  next(new NotFoundError());
})

app.use(errorHandler)


export { app };
