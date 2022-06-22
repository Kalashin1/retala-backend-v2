import { OrderSchema } from "../schemas/order.schema";
import { model } from 'mongoose';
import { Customers } from './customer.model'
import {
  IOrder,
  IOrderModel,
  createOrderParams,
  getBranchOrderParams,
  OrderId
} from '../../interfaces/order';

import * as moment from 'moment'

OrderSchema.statics.createOrder = async function (params: createOrderParams) {
  const customer = await Customers.findById(params.customer)
  if(customer){
    const customerTransactions = customer.transactions;
    // console.log(customer)
    const order = await this.create(params)
    console.log(customerTransactions)
    const updatedTransactions = [...customerTransactions, order._id]
    customer.updateOne({ transactions: updatedTransactions })
    return order
  }
}

OrderSchema.statics.getOrder = async function (id: OrderId) {
  return await this.findById(id);
}

OrderSchema.statics.getAllOrders = async function () {
  return await this.find({});
}

OrderSchema.statics.editOrder = async function (id: OrderId, params: createOrderParams) {
  return await this.findByIdAndUpdate(id, params)
}

OrderSchema.statics.getBranchOrders = async function (params: getBranchOrderParams) {
  let date
  // console.log(params)
  if (params.date != null) {
    date = moment(params.date).startOf('day')

  } else {
    date = moment().startOf('day')
  }

  const orders = await this.find({
    branch: params.branchId,
    seller: params.sellerId
  })

  // console.log(orders)
  return orders
}

OrderSchema.statics.returnOrder = async function (id: OrderId, comment: string){
  const order = await this.findById(id);
  if(order){
    order.comment = comment;
    order.status = 'returned'
    await order.updateOne({ comment, status: order.status });
    return order;
  }
  return false;
}

export const Orders = model<IOrder, IOrderModel>('order', OrderSchema)