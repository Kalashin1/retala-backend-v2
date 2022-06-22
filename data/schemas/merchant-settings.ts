import { Schema } from 'mongoose';
import { ISettings } from '../../interfaces/merchant-settings';

export const MerchantSettingSchema:Schema<ISettings> = new Schema({
  notification: {
    type: Boolean,
    default: false
  },
  tax: {
    type: Boolean,
    default: false
  },
  printer: {
    type: String,
    default: 'None'
  },
  trialStatus: {
    type: Boolean,
    default: false
  },
  referral:{
    type: String,
  },
  subscription: {
    type: String,
    default: 'None'
  },
  planId: 
  {
    type: Schema.Types.ObjectId,
    ref: 'Plan'
  },
  subscriptionStatus: {
    type: Boolean,
    default: false
  },
  subscriptionDate: {
    type: String
  },
  subscriptionExpiryDate: {
    type: String
  }
})