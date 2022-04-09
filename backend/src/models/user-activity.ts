import mongoose from "mongoose";
// import { collectionNames } from "../db/collections_names";

// enum UserActivityStatus {
//   Liked,
//   Dislike
// }


interface UserActivityAttrs {
  userId: string,
  comments: string[],
  likes: string[]

}

interface UserActivityDoc extends mongoose.Document {
  userId: string,
  comments: string[],
  likes: string[]
}

interface UserActivityModel extends mongoose.Model<UserActivityDoc> {
  build(attrs: UserActivityAttrs): UserActivityDoc;
}

const userActivitySchema = new mongoose.Schema({
  likes: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "Like",
        required: true
      },
    }
  ],
  comments: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
        required: true
      },
    }
  ],
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
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



userActivitySchema.statics.build = (attrs: UserActivityAttrs) => {
  return new UserActivity(attrs);
}


const UserActivity = mongoose.model<UserActivityDoc, UserActivityModel>('UserActivity', userActivitySchema);

export { UserActivity, UserActivityDoc }