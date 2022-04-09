import express from "express";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { upload } from "../../utils/multer";
import { currentUserHandler } from "./current-user";
import { deleteUserHandler } from "./delete-user";
import { resetPasswordHandler, resetPasswordValidator } from "./reset-password";
import { signInHandler, signInValidator } from "./sign-in";
import { signOutHandler } from "./sign-out";
import { signUpHandler, signUpValidator } from "./sign-up";
import { updateUserHandler, updateUserValidator } from "./update-user";
import { uploadAvatarHandler } from "./upload-avatar";
import { userAvatarHandler } from "./user-avatar";


const router = express.Router();

router.post("/sign-in", requireAuth, signInValidator, validateRequest, signInHandler)

router.post("/sign-up", requireAuth, signUpValidator, validateRequest, signUpHandler)
router.post("/sign-out", requireAuth, signOutHandler)
router.get("/me", requireAuth, currentUserHandler)
router.delete("/me", requireAuth, deleteUserHandler)
router.patch("/me", requireAuth, updateUserValidator, validateRequest, updateUserHandler)
router.post("/avatar/me", requireAuth, upload.single('avatar'), uploadAvatarHandler);
router.patch("/password/me", requireAuth, resetPasswordValidator, validateRequest, resetPasswordHandler);
router.get("/avatar/:userId", requireAuth, userAvatarHandler);


export { router as authRouter };