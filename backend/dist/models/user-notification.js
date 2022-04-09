"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotification = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var userNotificationSchema = new mongoose_1.default.Schema({
    notifications: [
        {
            userId: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "User",
                required: true
            },
            likeId: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "Like",
            }, commentId: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "Comment",
            }, imageId: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "Image",
                required: true
            }, date: {
                type: Date,
                default: new Date(),
                required: true
            }
        }
    ],
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        sparse: true,
    },
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});
userNotificationSchema.statics.build = function (attrs) {
    return new UserNotification(attrs);
};
var UserNotification = mongoose_1.default.model('UserNotification', userNotificationSchema);
exports.UserNotification = UserNotification;
