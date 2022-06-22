import { model } from "mongoose";
import { IUser, IUserModel,
  createUserAccountParams, 
  editUserAccountParams,
  userId,
  userEmail,
  emailVerificationResult,
  resetPasswordParams,
  verifyPhoneNumberParams,
  verifyPhoneNumberResult,
  loginUserParams,
  userPhoneNumber
} from "../../interfaces/user";
/**
 * @import from the interface for branches
 */
import {
  createBranchParams
} from '../../interfaces/branch'
/**
 * @import from the interface for merchants
 */
import {
  createMerchantParams
} from '../../interfaces/merchant'
import { UserSchema } from "../schemas/user.schema";
// @ts-ignore
import { hashPassword, createAuthJWT } from '../../utils/helper'


import { Branches } from './branch.model';
import { Merchants } from './merchant.model'

UserSchema.pre('save', async function() {
  let password = this.password.toString();
  if(password.length < 15){
    password = await hashPassword(password);
    this.password = password;
  } 
})

// TODO: add a post 'save' function to add a new activity user created
// TODO: add a post 'update' function to add a new activity user update

UserSchema.statics.createNewUser = async function (params: createUserAccountParams){
  const user = await this.create(params);
  const token = await createAuthJWT(user._id);
  // console.log(token)
  await user.updateOne({ token })
  const updatedUser = await this.findById(user._id) 
  return updatedUser;
}

UserSchema.statics.editUser = async function (userId: userId, params:editUserAccountParams) {
  let user = await this.findById(userId);
  // console.log(use)
  await user.updateOne(params);
  let updatedUser = await this.findById(user._id);
  return updatedUser
}

UserSchema.statics.deleteUser = async function (userId: userId) {
  const user = await this.findById(userId);
  let result = true;
  user._id ? await user.deleteOne(): result = false;
  return result;
}

UserSchema.statics.verifyEmail = async function (userEmail: userEmail) {
  let returnValue: emailVerificationResult = {
    status: false
  }
  const user = await this.findOne({ email: userEmail });
  if(user._id){
    await user.updateOne({ email: userEmail })
    returnValue.status = true;
    returnValue.user = user;
    return returnValue
  } else {
    returnValue.status = false;
  }
}

UserSchema.statics.resetPassword = async function (params: resetPasswordParams) {
  const user = await this.findById(params.id);
  if(user){
    const password = await hashPassword(params.password);
    user.password = password;
    return user
  }
  return;
}

UserSchema.statics.verifyPhoneNumber = async function (params: verifyPhoneNumberParams) {
  const user:IUser = await this.findById(params.id);
  if(user){
    const oldPhoneNumber = user.phone;
    let isNewPhoneNumber;
    oldPhoneNumber === params.phoneNumber ? isNewPhoneNumber = true: isNewPhoneNumber = false;
    if(isNewPhoneNumber){
      return
    }
    user.phone = params.phoneNumber
    let res: verifyPhoneNumberResult = { status: false }
    res.newPhoneNumber = params.phoneNumber
    res.oldPhoneNumber = oldPhoneNumber.toString()
    res.status = true
    res.userId = user._id.toString()
    return res;
  }
}

UserSchema.statics.checkEmail = async function (email: userEmail) {
  const user = await this.findOne({ email })
  let result: boolean;
  user._id ? result = false: result = true; 
  return result
}

UserSchema.methods.login = async function (params: loginUserParams) {
  let user = await this.findOne({ $or: [{ phone: params.phone }, { email: params.phone }]})
  // if
}


UserSchema.statics.findUserById = async function(id: userId){
  const user = await this.findById(id)
  if(user){
    return user
  }
  return null;
}

UserSchema.statics.findUserByName = async function(name: string){
  const user = await this.findOne({ name });
  if(user){
    return user;
  }
  return null;
}

UserSchema.statics.findUserByEmail = async function(email: string){
  const user = await this.findOne({ email });
  if(user){
    return user;
  }
  return null;
}

UserSchema.statics.findUserByPhoneNumber = async function(phone: userPhoneNumber){
  const user = await this.findOne({ phone })
  if(user){
    return user;
  }
  return null;
}

UserSchema.statics.users = async function(){
  return this.find({});
}


export const Users = model<IUser, IUserModel>('user', UserSchema);