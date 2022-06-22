import { Schema } from "mongoose";
import { IQuantity } from "../../interfaces/quantity";

export const QuantitySchema = new Schema<IQuantity>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, "Provide the product for this quantity"]
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: 'Branch',
    required: [true, "Provide the branch for this quantity"]
  },
  quantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})