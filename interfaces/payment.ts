import { Document, Model, ObjectId } from 'mongoose';
import { merchantId } from './merchant';

export interface IPayment extends Document {
  ref: string,
  amount: string,
  type: string,
  merchant: merchantId
  duration: number
  plan:ObjectId
}

export type createPaymentParams = {
  ref: string,
  amount: string,
  type: string,
  merchant: merchantId
  duration: number
  plan: ObjectId
}

export type paymentId = ObjectId | string

export interface IPaymentModel extends Model<IPayment>{
  createPayment: (params: createPaymentParams) => Promise<IPayment>
  getPayment: (id: paymentId) => Promise<IPayment | boolean>
  startTrial: (id: merchantId) => Promise<boolean>
}