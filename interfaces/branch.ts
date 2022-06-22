//@ts-ignore
import { ObjectID } from "bson";
import { Document, Model, ObjectId } from "mongoose";
import { merchantId } from "./merchant";
import { userId } from "./user";

export interface IBranch extends Document {
  name: string
  address: string
  state: string
  merchant:  ObjectId
  createdAt: number
}

export type createBranchParams = {
  name?: string,
  merchant: string | ObjectId | ObjectID
}

export type EditBranchParams = {
  name: string
  address: string
  state: string
}

export type branchId = userId

export interface IBranchModel extends Model<IBranch>{
  createNewBranch: (params: createBranchParams) => Promise<IBranch>
  getBranch: (id: branchId) => Promise<IBranch>
  editBranch: (id: branchId, params: EditBranchParams) => Promise<boolean>
  deleteBranch: (id: branchId) => Promise<boolean>
  getAllBranches: () => Promise<IBranch[]>
  findMerchantBranches: (id: merchantId) => Promise<IBranch[]>
}