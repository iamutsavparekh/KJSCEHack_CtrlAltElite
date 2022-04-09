import mongoose from "mongoose";
// import { collectionNames } from "../db/collections_names";

// enum LikeStatus {
//   Liked,
//   Dislike
// }


interface LikeAttrs {
  userId: String,
  imageId: String,
  like: { userId: String }[],
  laugh: { userId: String }[],
  heart: { userId: String }[],
  emotional: { userId: String }[],
  crying: { userId: String }[],
  celebrate: { userId: String }[],


}

interface LikeDoc extends mongoose.Document {
  userId: String,
  imageId: String,
  like: { userId: String }[],
  laugh: { userId: String }[],
  heart: { userId: String }[],
  emotional: { userId: String }[],
  crying: { userId: String }[],
  celebrate: { userId: String }[],

}

interface LikeModel extends mongoose.Model<LikeDoc> {
  build(attrs: LikeAttrs): LikeDoc;
}

const likeSchema = new mongoose.Schema({
  like: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
      },
    }
  ],
  heart: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
      },
    }
  ],
  laugh: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
      },
    }
  ],
  emotional: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
      },
    }
  ],
  crying: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
      },
    }
  ],
  celebrate: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
      },
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
    unique: true
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

likeSchema.virtual('users', {
  ref: "User",
  localField: "like.userId",
  foreignField: "_id"
})


likeSchema.index({ "like.emailId": "text", "walkathonId": "text", "stepsChallengeId": "text" })

likeSchema.statics.build = (attrs: LikeAttrs) => {
  return new Like(attrs);
}


const Like = mongoose.model<LikeDoc, LikeModel>('Like', likeSchema);

export { Like, LikeDoc }