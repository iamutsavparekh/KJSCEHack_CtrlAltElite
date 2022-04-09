"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var multer_1 = __importDefault(require("multer"));
var bad_request_error_1 = require("../errors/bad-request-error");
exports.upload = (0, multer_1.default)({
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)) {
            return cb(new bad_request_error_1.BadRequestError("Please upload an image"));
        }
        return cb(null, true);
    },
});
