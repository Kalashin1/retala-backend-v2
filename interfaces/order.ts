import { Document, Model, ObjectId } from "mongoose";

export interface IOrder extends Document {
  title: string
  invoiceNo: string
  type: string
  orderTotal: number
  tax: number
  discount: string
  grandTotal: number
  branch: ObjectId
  customer: ObjectId
  status: string
  comment: string
  orderItems: [OrderItem],
  payment: [ObjectId],
  seller: ObjectId
  createdAt: string
  updatedAt: string
}

export type OrderItem = {
  product: ObjectId
  quantity: number
} 
export type createOrderParams = {
  title: string
  type: string
  branch: ObjectId
  customer: ObjectId
  discount: string
  invoiceNo: string
  orderItems: [OrderItem]
  payment: ObjectId
  orderTotal: number
  grandTotal: number
  tax: number
  seller: ObjectId
}

export type OrderId = ObjectId | string

export interface IOrderModel extends Model<IOrder> {
  createOrder: (params: createOrderParams) => Promise<IOrder | boolean>
  editOrder: (id: OrderId, params: createOrderParams) => Promise<IOrder | boolean>
  getOrder: (id: OrderId) => Promise<IOrder | boolean>
  getAllOrders: () => Promise<IOrder[]>
  getBranchOrders: (params: getBranchOrderParams) => Promise<IOrder[]>
  returnOrder: (id: OrderId, commetn: string) => Promise<IOrder|boolean>;
}

export type getBranchOrderParams = {
  branchId: ObjectId
  sellerId: ObjectId
  type: number
  date: string
}


