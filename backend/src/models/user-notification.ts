import mongoose from "mongoose";
// import { collectionNames } from "../db/collections_names";




interface UserNotificationAttrs {
  userId: string,
  notifications: string[],
}

interface UserNotificationDoc extends mongoose.Document {
  userId: string,
  notifications: { likeId?: string, commentId?: string, imageId: string, userId: string, date: Date }[],
}

interface UserNotificationModel extends mongoose.Model<UserNotificationDoc> {
  build(attrs: UserNotificationAttrs): UserNotificationDoc;
}

const userNotificationSchema = new mongoose.Schema({
  notifications: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
      },
      likeId: {
        type: mongoose.Types.ObjectId,
        ref: "Like",
      }, commentId: {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      }, imageId: {
        type: mongoose.Types.ObjectId,
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


userNotificationSchema.statics.build = (attrs: UserNotificationAttrs) => {
  return new UserNotification(attrs);
}


const UserNotification = mongoose.model<UserNotificationDoc, UserNotificationModel>('UserNotification', userNotificationSchema);

export { UserNotification, UserNotificationDoc }