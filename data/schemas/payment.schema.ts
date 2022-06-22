import {
  IPayment
} from '../../interfaces/payment'

import {
  Schema
} from 'mongoose'
import { ObjectId } from 'mongodb'


export const PaymentSchema = new Schema<IPayment>({
  ref: String,
  amount: String,
  type: String,
  merchant: {
    type: Schema.Types.ObjectId,
    ref: 'Merchant'
  },
  duration: Number,
  plan: {
    type: ObjectId,
    required: [true, "Please enter the plan the merchant is paying for."]
  }
}, {
  timestamps: true
})
