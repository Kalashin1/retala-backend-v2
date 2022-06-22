import { Document, Model, ObjectId } from "mongoose";
import { ISettings } from "./merchant-settings";
import { userId } from "./user";
import { ICardSetting } from "./card";
import { createBranchParams } from "./branch";

export interface IMerchant extends Document {
  _id: ObjectId
  name: string
  lastLogin: string
  owner:  userId
  city: string
  state: string
  referral: string
  setting: ISettings
  cardDetails: ICardSetting
  createdAt: number
  updatedAt: number
}

export type merchantId = ObjectId | string

export type createMerchantParams = {
  name: string
  owner: userId
  state?: string
  referral?: string
}

export type editMerchantParams = {
  name: string
  owner: userId
  setting: ISettings
  cardDetails: ICardSetting
}

export type updateSettingsParams = {
  notification: boolean
  tax: boolean
  printer: string
}

export interface IMerchantModel extends Model<IMerchant>{
  createMerchant: (
    params: createMerchantParams,
    branchParams: createBranchParams
  ) => Promise<IMerchant>
  
  editMerchant: (id: merchantId, params: editMerchantParams) => Promise<boolean>
  deleteMerchant: (param: merchantId) => Promise<boolean>
  merchant: (param: merchantId) => Promise<IMerchant>
  updateMerchantSettings: (id: merchantId, setting: updateSettingsParams) => Promise<boolean | merchantId>;
}