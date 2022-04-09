"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var commentSchema = new mongoose_1.default.Schema({
    comments: [
        {
            userId: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "User",
                required: true
            },
            comment: {
                type: String,
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
    imageId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Image",
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
//commentSchema.index({ "comment.imageId": "text", "userId": "text", })
commentSchema.statics.build = function (attrs) {
    return new Comment(attrs);
};
var Comment = mongoose_1.default.model('Comment', commentSchema);
exports.Comment = Comment;
