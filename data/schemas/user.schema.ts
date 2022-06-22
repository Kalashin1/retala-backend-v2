import { Schema } from "mongoose";
import { IUser } from "../../interfaces/user";

export const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"]
  },
  lastLogin: {
    type: String,
  },
  code: String,
  email: {
    type: String,
    unique: true,
    required: [true, "please provide your email"]
  },
  referral: {
    type: String,
  },
  token: {
    type: String
  },
  phone: {
    type: String,
    unique: true,
    required: [true, "please provide your phone number"]
  },

  profile_img: {
    type: String,
  },

  password: {
    type: String,
    required: [true, "please enter a password"]
  },

  reset: {
    type: String,
  },
  setupStatus: {
    type: String
  },
  role: Number,
  createdAt: {
    type: Number,
    default: () => new Date().getTime()
  },
  updatedAt: {
    type: Number
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  phoneNumberVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})