import { ObjectID } from "bson";
import { Document, Model, ObjectId } from "mongoose";

export interface IUser extends Document {
  /**
   * @field unique id for each user
   */
  _id: ObjectId
  /**
   * @field name of each user
   */
  name: string
  /**
   * @field ? Store's the user android's deivice uid
   */
  device_uuid: string
  /**
   * @field last date they logged in
   */
  lastLogin: string
  /**
   * @field unique email for each user
   */
  email: string
  /**
  * @field the id of the the person that referred
   */
  referral: string
  /**
   * @field phone number of the person
   */
  phone: string
  /**
   * @field profile image of he user
   */
  profile_img: string
  /**
   * @field password
   */
  password: string
  /**
   * @field reset ? don't know what this is.
   */
  reset: string
  /**
   * @field what this is yet. Deprecated
   */
  setupStatus: string
  /**
   * @field Determines their role in the shop, 2 - shop_owner, 1 - manager, 0 - seller
   */
  role: number
  /**
   * @field when the user was created
   */
  createdAt: number
  /**
   * @field last time the user updated their info
   */
  updatedAt: number
  /**
   * @field the user's jwt auth token 
   */
  token: string
  /**
   * @field if they have validated their email 
   */
  emailVerified: boolean
  /**
   * @field boolean indicating if they have validated their phone number 
   */
  phoneNumberVerified: boolean
  code: string
  /**
   * @field logs a user in
   */
  login: (params: loginUserParams) => Promise<IUser>
  /**
   * @field allows the current user to request an email verification link
   */
  requestVerifyEmailLink: () => Promise<string>
  /**
   * @field allows the current user to request a password reset email
   */
  requestPasswordResetEmail: () => Promise<boolean>
}

export type loginUserParams = {
  phone: string
  email: string
  device: string
}

export type createUserAccountParams = {
  name: string,
  role: number,
  password: string,
  email: string,
  phone: string,
  referral: string
  businessName: string
  state: string
}

export type editUserAccountParams = {
  name: string,
  role: string
}

export type userId = ObjectId | ObjectID | string;

export type userEmail = string 

export type userPhoneNumber = string

export type emailVerificationResult = {
  status: boolean
  user?: IUser
}

export type resetPasswordParams = {
  id: userId
  password: string
}

export type verifyPhoneNumberParams = {
  id: userId
  phoneNumber: string
}

export type resetPasswordResult = {
  status: boolean
  user: IUser
}

export type verifyPhoneNumberResult = {
  status: boolean
  oldPhoneNumber?: string
  newPhoneNumber?: string
  userId?: string
}

export type updateSettingsParams = {
  notification: boolean
  tax: boolean
  printer: string
}

export interface IUserModel extends Model<IUser> {
  createNewUser: (params: createUserAccountParams) => Promise<IUser>
  editUser: (id: userId, params: editUserAccountParams) => Promise<IUser>
  verifyEmail: (email: userEmail) => Promise<emailVerificationResult>
  resetPassword: (params: resetPasswordParams) => Promise<IUser>
  verifyPhoneNumber: (params: verifyPhoneNumberParams) => Promise<verifyPhoneNumberResult>
  deleteUser: (id: userId) => Promise<boolean>
  checkEmail: (email: userEmail) => Promise<boolean>
  findUserById: (id: userId) => Promise<IUser>
  findUserByName: (name: string) => Promise<IUser>
  findUserByEmail: (email: userEmail) => Promise<IUser>
  findUserByPhoneNumber: (phone: userPhoneNumber) => Promise<IUser>
  users: () => Promise<IUser[]>
}