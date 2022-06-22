import { Document, Model, ObjectId } from "mongoose";
import { IPlan } from "./plan";

export interface ISettings extends Document {
  notification: Boolean
  tax: Boolean
  printer: String
  trialStatus:  Boolean
  referral: String
  subscription: any
  planId: ObjectId
  plan: IPlan
  subscriptionStatus: Boolean
  subscriptionDate: String
  subscriptionExpiryDate: String
} 