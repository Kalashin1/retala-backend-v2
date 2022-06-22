import { IOrder, OrderItem } from "../../interfaces/order";
import { Schema } from 'mongoose'

export const OrderSchema = new Schema<IOrder>({
  title: {
    type: String
  },
  invoiceNo: {
    type: String,
    required: true,
    // unique: true
  },
  type: {
    type: String,
    default: '+'
  },
  orderTotal: {
    type: Number,
  },
  tax: {
    type: Number,
  },
  discount: {
    type: String,
    // required: true,
  },
  grandTotal: {
    type: Number,
    required: true,
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: 'Branch'
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  },
  status: {
    type: String,
    default: 'Fulfilled'
  },
  comment: {
    type: String
  },
  orderItems: [Object],
  payment: Schema.Types.ObjectId,
  seller: Schema.Types.ObjectId
}, {
  timestamps: true
});
