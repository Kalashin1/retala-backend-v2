import { ISeller } from "../../interfaces/seller";
import { Schema } from "mongoose";

export const SellerSchema = new Schema<ISeller>({
  name: {
    type: String,

  },

  lastLogin: {
    type: String,
  },
  device: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  role: {
    type: String,
    default: 'Seller'
  },
  password: {
    type: String,

  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: 'Branch'
  },
  merchant: {
    type: Schema.Types.ObjectId,
    ref: 'Merchant'
  },
})