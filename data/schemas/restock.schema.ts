import { IRestock } from "../../interfaces/restock"
import { Schema } from 'mongoose';

export const RestockSchema = new Schema<IRestock>({
  branch: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'Restock'
  },
  receiveBranch: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  },
  items: [],
  seller: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

