"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRouter = void 0;
var express_1 = __importDefault(require("express"));
var require_auth_1 = require("../../middlewares/require-auth");
var validate_request_1 = require("../../middlewares/validate-request");
var get_comments_1 = require("./get-comments");
var post_comment_1 = require("./post-comment");
var router = express_1.default.Router();
exports.commentsRouter = router;
router.post("/upload", require_auth_1.requireAuth, post_comment_1.postCommentValidator, validate_request_1.validateRequest, post_comment_1.postCommentHandler);
router.get("/:imageId", require_auth_1.requireAuth, get_comments_1.getCommentsValidator, validate_request_1.validateRequest, get_comments_1.getCommentsHandler);
