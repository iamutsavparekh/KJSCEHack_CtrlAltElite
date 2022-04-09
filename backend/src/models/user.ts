import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { BadRequestError } from "../errors/bad-request-error";
import { NextFunction } from "express";
import bcrypt from "bcrypt"

interface UserAttrs {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar?: Buffer;
  password?: string;
}

export interface UserDoc extends mongoose.Document {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar?: Buffer;
  password?: string;
  token?: string;
  generateAuthToken(): Promise<string>;
  generateChangePasswordToken(): Promise<string>;
  softDelete(): Promise<void>;
  reactivateAccount(): Promise<void>;
  initializeCollections(timeZone: string): Promise<void>;

}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
  findByCredentials(email: string, password: string, next: NextFunction): Promise<UserDoc>;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    updatesReadDate: {
      type: Date
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      trim: true,
      required: true
    },
    lastName: {
      type: String,
      trim: true,
      required: true
    },
    avatar: {
      type: Buffer,
    },
    password: {
      type: String,
      minlength: 7,
      maxelength: 50,
      trim: true,
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.avatar;
        delete ret.token;
        delete ret.__v;
      }
    }
  }
)

userSchema.index({ "organizationEmail": "text", "email": "text" });

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.get("password"), 8);
    this.set("password", hashedPassword);
    if (this.get("token")) {
      this.set("token", null);
    }

  }

  done();
})

// creates a authentication token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ id: user.get("_id"), email: user.get("email") }, process.env.JWT_SECRET!);

  user.set("token", token);
  await user.save();

  return token;
};


userSchema.statics.findByCredentials = async (email: string, password: string, next: NextFunction) => {
  const user = await User.findOne({ email });

  if (!user) {
    return next(new BadRequestError('Invalid Credentials'));
  }

  let isMatch = false;

  if (user.password) {
    isMatch = await bcrypt.compare(user.password, password);
  }

  if (!isMatch) {
    return next(new BadRequestError('Invalid Credentials'));
  }

  return user;
};


const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
