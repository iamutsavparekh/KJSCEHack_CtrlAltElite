import mongoose from "mongoose";
// import { collectionNames } from "../db/collections_names";




interface CommentAttrs {
  userId: string,
  imageId: string,
  comments: string[],
}

interface CommentDoc extends mongoose.Document {
  userId: string,
  imageId: string,
  comments: { comment: string, userId: string, date: Date }[],
}

interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc;
}

const commentSchema = new mongoose.Schema({
  comments: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
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
    type: mongoose.Types.ObjectId,
    ref: "User",
    sparse: true,
  },
  imageId: {
    type: mongoose.Types.ObjectId,
    ref: "Image",
    sparse: true,
  },
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
})


//commentSchema.index({ "comment.imageId": "text", "userId": "text", })

commentSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment(attrs);
}


const Comment = mongoose.model<CommentDoc, CommentModel>('Comment', commentSchema);

export { Comment, CommentDoc }