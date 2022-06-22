import { Document, Model, ObjectId } from "mongoose";
import { userId } from "./user";

export interface IActivities extends Document {
  _id: userId
  type: string
  text: string
  operation: string
  itemId: string
  isRead: boolean
  userId: string
}

export type createActivityParams = {
  type: string
  text: string
  operation: string
  itemId: string
  userId: string
}

export interface IActivitiesModel extends Document<IActivities> {
  createActivity:(params: createActivityParams) => Promise<IActivities>
  findUserActivities: (param: userId) => IActivities[]
  findUserActivity: (_userId: userId, activityId: ObjectId | string) => Promise<IActivities>
  getUserUnreadActivity: (_userId: userId) => Promise<IActivities>
  deleteActivity: (param: ObjectId | string) => Promise<boolean>
}