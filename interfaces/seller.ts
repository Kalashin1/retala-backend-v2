import { Document, Model, ObjectId } from "mongoose";
import { branchId } from "./branch";
import { merchantId } from "./merchant";
import { userId } from "./user";

export interface ISeller extends Document {
  name: string
  _id: ObjectId
  lastLogin: string
  device:string
  email: string
  role: string
  password: string
  branch: userId
  merchant: userId
} 

export type sellerId = ObjectId | string 

export type createSellerParams = {
  name: string
  email: string
  role: string
  password: string
  branch: userId
  merchant: userId
} 

export type editSellerParams = {
  name: string
  email: string
  role: string
  branch: userId
}

export interface ISellerModel extends Model<ISeller>{
  createSeller: (params: createSellerParams) => Promise<ISeller>
  getBranchSellers: (branch: branchId) => Promise<ISeller[]>
  editSeller:(params: editSellerParams) => Promise<ISeller>
  deleteSalesPerson: (id: userId) => Promise<boolean>
  findSellerByMerchant: (merchantId: userId) => Promise<ISeller[]>
}