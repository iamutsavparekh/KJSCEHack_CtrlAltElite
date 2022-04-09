"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var imageSchema = new mongoose_1.default.Schema({
    image: {
        type: Buffer,
    },
    imageType: {
        type: String,
        required: true
    },
    imageTitle: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    originalImage: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Image",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likesCount: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    }
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.image;
            delete ret.__v;
        }
    }
});
imageSchema.index({ "userId": "text", "imageType": "text", "imageTitle": "text" });
imageSchema.statics.build = function (attrs) {
    return new Image(attrs);
};
// imageSchema.index({ "imageType": "text" });
var Image = mongoose_1.default.model('Image', imageSchema);
exports.Image = Image;
