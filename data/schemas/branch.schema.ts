import { Schema } from 'mongoose';
import { IBranch } from '../../interfaces/branch';

export const BranchSchema: Schema<IBranch> = new Schema({
  name: {
    type: String,
    default: "Main"
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  merchant: {
    type: Schema.Types.ObjectId,
    require: [true, "Please provide the id of the merchant this branch belongs."]
  },
  createdAt: {
    type: Number,
    default: () => new Date().getTime()
  }
}, { timestamps: true})