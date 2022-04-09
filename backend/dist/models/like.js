"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var likeSchema = new mongoose_1.default.Schema({
    like: [
        {
            userId: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "User",
                required: true
            },
        }
    ],
    heart: [
        {
            userId: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "User",
                required: true
            },
        }
    ],
    laugh: [
        {
            userId: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "User",
                required: true
            },
        }
    ],
    emotional: [
        {
            userId: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "User",
                required: true
            },
        }
    ],
    crying: [
        {
            userId: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "User",
                required: true
            },
        }
    ],
    celebrate: [
        {
            userId: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "User",
                required: true
            },
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
        unique: true
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
likeSchema.virtual('users', {
    ref: "User",
    localField: "like.userId",
    foreignField: "_id"
});
likeSchema.index({ "like.emailId": "text", "walkathonId": "text", "stepsChallengeId": "text" });
likeSchema.statics.build = function (attrs) {
    return new Like(attrs);
};
var Like = mongoose_1.default.model('Like', likeSchema);
exports.Like = Like;
