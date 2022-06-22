import { Schema } from 'mongoose';
import { IMerchant } from '../../interfaces/merchant';
import { MerchantSettingSchema } from './merchant-settings';
import { MerchantCardSetting } from './card.schema';

export const MerchantSchema:Schema<IMerchant> = new Schema({
  name: {
    type: String,
    required: [true, "Please provide the name of the merchant."]
  },
  lastLogin: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: [true, "Please provide the user this merchant belongs to."]
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  referral: {
    type: String,
  },
  setting: {
    type: MerchantSettingSchema
  },
  cardDetails: {
    type: MerchantCardSetting
  },
  createdAt: {
    type: Number,
    default:() => new Date().getTime()
  },
  updatedAt: {
    type: Number
  }
}, {
  timestamps: true
})