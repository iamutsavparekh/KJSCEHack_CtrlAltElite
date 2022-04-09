import mongoose from "mongoose";

interface ImageAttrs {
  image?: Buffer;
  imageType: string;
  imageTitle: string;
  userId: string;
  originalImage?: string;
  description?: string;
}

interface ImageDoc extends mongoose.Document {
  image?: Buffer;
  imageType: string;
  imageTitle: string;
  originalImage: string;
  userId: string;
  description: string;
  likesCount: number;
  commentsCount: number;
}

interface ImageModel extends mongoose.Model<ImageDoc> {
  build(attrs: ImageAttrs): ImageDoc;
}

const imageSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  originalImage: {
    type: mongoose.Schema.Types.ObjectId,
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
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.image;
      delete ret.__v;
    }
  }
})


imageSchema.index({ "userId": "text", "imageType": "text", "imageTitle": "text" })

imageSchema.statics.build = (attrs: ImageAttrs) => {
  return new Image(attrs);
}

// imageSchema.index({ "imageType": "text" });

const Image = mongoose.model<ImageDoc, ImageModel>('Image', imageSchema);

export { Image, ImageDoc }