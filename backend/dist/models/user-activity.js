"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivity = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var userActivitySchema = new mongoose_1.default.Schema({
    likes: [
        {
            userId: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "Like",
                required: true
            },
        }
    ],
    comments: [
        {
            userId: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "Comment",
                required: true
            },
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
userActivitySchema.statics.build = function (attrs) {
    return new UserActivity(attrs);
};
var UserActivity = mongoose_1.default.model('UserActivity', userActivitySchema);
exports.UserActivity = UserActivity;
