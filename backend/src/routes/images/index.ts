import express from "express";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { upload } from "../../utils/multer";
import { addImageHandler, addImageValidator } from "./add-image";
import { getFeedHandler } from "./get-feed-images";
import { imageHandler } from "./get-image";
import { getUserImagesHandler } from "./get-user-images";
import { uploadImageHandler } from "./upload-image";


const router = express.Router();

router.post("/meta/add", requireAuth, addImageValidator, validateRequest, addImageHandler)
router.post("/upload", requireAuth, upload.single('image'), uploadImageHandler);

router.get("/feed", requireAuth, getFeedHandler);
router.get("/me", requireAuth, getUserImagesHandler);
router.get("/:imageId", requireAuth, imageHandler);



export { router as imageRouter };