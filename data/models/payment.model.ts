import {
  IPayment,
  IPaymentModel,
  createPaymentParams,
  paymentId
} from '../../interfaces/payment'
import { Merchants } from './merchant.model'
import { Users } from './user.model'
import { model, ObjectId } from 'mongoose';
import { PaymentSchema } from '../schemas/payment.schema'
import { SubPlans } from './plan.model';
import { merchantId } from '../../interfaces/merchant';
import axios from 'axios';

PaymentSchema.statics.createPayment = async function (params: createPaymentParams) {
  let merchant = await Merchants.findById(params.merchant);
  const user = await Users.findById(merchant.owner)
  let plan = await SubPlans.findById(params.plan);
  const payment = await this.create(params);
  var currentDate = new Date();
  var newDate = new Date();
  newDate.setDate(newDate.getDate() + params.duration);
  console.log(currentDate);
  console.log(newDate);


  let setting = {
    subscription: plan.title,
    planId: params.plan,
    plan: await SubPlans.findById(params.plan),
    subscriptionStatus: true,
    subscriptionDate: currentDate.getTime().toString(),
    subscriptionExpiryDate: newDate.getTime().toString()
  }
  await merchant.updateOne({ setting });
  return payment;
}

PaymentSchema.statics.startTrial = async function (id: merchantId) {
  let merchant = await Merchants.findOne({
    '_id': id
  });
  console.log('merchant', merchant);

  let data
  var currentDate = new Date();
  var newDate = new Date();
  newDate.setDate(newDate.getDate() + 30);
  console.log(currentDate);
  console.log(newDate);

  let plan = await SubPlans.findOne({ title: 'Super Plan' });
  console.log(plan);
  let setting  = {
    subscription: '30 Days Free Trial',
    planId: plan._id,
    plan: plan,
    subscriptionStatus: true,
    subscriptionDate: currentDate.getTime().toString(),
    subscriptionExpiryDate : newDate.getTime().toString(),
    trialStatus: true
  }
  console.log(setting)
  await merchant.updateOne({ setting });
  return { status: true, data: merchant._id, merchant };
}


PaymentSchema.statics.getPayment = async function (id: paymentId) {
  const payment = await this.findById(id)
  if (!payment) {
    return false;
  }
  return payment;
}

export const Payments = model<IPayment, IPaymentModel>('payment', PaymentSchema);