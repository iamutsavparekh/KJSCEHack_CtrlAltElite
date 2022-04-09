"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCommentValidator = exports.postCommentHandler = void 0;
var express_validator_1 = require("express-validator");
var http_status_codes_1 = require("http-status-codes");
var image_1 = require("../../models/image");
var not_found_error_1 = require("../../errors/not-found-error");
var not_authorized_error_1 = require("../../errors/not-authorized-error");
var bad_words_1 = __importDefault(require("bad-words"));
var user_activity_1 = require("../../models/user-activity");
var comment_1 = require("../../models/comment");
var user_notification_1 = require("../../models/user-notification");
var filter = new bad_words_1.default();
var handler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, comment, imageId, existingUser, _b, userActivity, comments, image, userNotification;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, comment = _a.comment, imageId = _a.imageId;
                existingUser = req.currentUser;
                if (!existingUser) {
                    throw new not_authorized_error_1.NotAuthorizedError();
                }
                return [4 /*yield*/, Promise.all([
                        user_activity_1.UserActivity.findById(existingUser._id),
                        comment_1.Comment.findOne({ imageId: imageId }),
                        image_1.Image.findById(imageId)
                    ])];
            case 1:
                _b = _c.sent(), userActivity = _b[0], comments = _b[1], image = _b[2];
                if (!comments || !userActivity || !image) {
                    throw new not_found_error_1.NotFoundError();
                }
                comments.comments.push({
                    comment: comment,
                    userId: existingUser._id,
                    date: new Date()
                });
                return [4 /*yield*/, user_notification_1.UserNotification.findById({
                        userId: comments.userId
                    })];
            case 2:
                userNotification = _c.sent();
                return [4 /*yield*/, comments.save()];
            case 3:
                _c.sent();
                userNotification === null || userNotification === void 0 ? void 0 : userNotification.notifications.push({
                    commentId: comments._id,
                    date: new Date(),
                    userId: existingUser._id,
                    imageId: imageId
                });
                userActivity.comments.push(comments._id);
                image.commentsCount = image.commentsCount + 1;
                return [4 /*yield*/, (userNotification === null || userNotification === void 0 ? void 0 : userNotification.save())];
            case 4:
                _c.sent();
                return [4 /*yield*/, userActivity.save()];
            case 5:
                _c.sent();
                res.status(http_status_codes_1.StatusCodes.CREATED).send(comments._id);
                return [2 /*return*/];
        }
    });
}); };
exports.postCommentHandler = handler;
var validator = [
    (0, express_validator_1.check)('comment')
        .trim()
        .optional()
        .custom(function (data) { return !filter.isProfane(data); })
        .isLength({ min: 1, max: 5000 }).withMessage('please enter appropriate comment'),
    (0, express_validator_1.check)('imageId')
        .trim()
        .notEmpty()
        .isMongoId()
];
exports.postCommentValidator = validator;
