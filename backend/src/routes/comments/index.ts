import express from "express";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { upload } from "../../utils/multer";
import { getCommentsHandler, getCommentsValidator } from "./get-comments";
import { postCommentHandler, postCommentValidator } from "./post-comment";


const router = express.Router();

router.post("/upload", requireAuth, postCommentValidator, validateRequest, postCommentHandler)

router.get("/:imageId", requireAuth, getCommentsValidator, validateRequest, getCommentsHandler);



export { router as commentsRouter };