import { Schema } from 'mongoose';
import { ICustomer } from '../../interfaces/customer';
import { ObjectId } from 'mongodb';

export const CustomerSchema = new Schema<ICustomer>({
  name: {
    type: String,
    required: [true, "a customer requires a name"],
  },
  phone: {
    type: String,
  },
  bill: {
    type: Number,
    default: 0
  },
  branch: {
    type: ObjectId,
    ref: 'Branch'
  },
  transactions: [],
  merchant: {
    type: ObjectId,
    ref: 'Merchant'
  },
}, {
  timestamps: true
})

CustomerSchema.index({
  name: -1,
  phone: -1,
});