import express from "express";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { upload } from "../../utils/multer";
import { getReactionsHandler, getReactionsValidator } from "./get-reactions";
import { reactToImageHandler, reactToImageValidator } from "./react-image";



const router = express.Router();

router.get("/:imageId", requireAuth, getReactionsValidator, validateRequest, getReactionsHandler)
router.post("/react", requireAuth, reactToImageValidator, validateRequest, reactToImageHandler);



export { router as likeRouter };