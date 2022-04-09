import multer from "multer";
import { BadRequestError } from "../errors/bad-request-error";

export const upload = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)) {
      return cb(new BadRequestError("Please upload an image"));
    }
    return cb(null, true);
  },
});
