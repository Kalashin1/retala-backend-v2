import { Schema } from 'mongoose';
import { IProduct, IProductModel } from '../../interfaces/products';

export const ProductSchema = new Schema<IProduct, IProductModel>({
  name: {
    type: String,
    required: [true, 'please provide the name of the product']
  },
  merchant: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: {
    type: Number,
    required: true
  },
  image: {
    type: String,
  },
  barcode: {
    type: String,
  },
  price: {
    type: Number
  },
  costPrice: {
    type: Number
  },
  minimumStock: {
    type: Number,
    default: 1
  },
  packProduct: {
    type: Schema.Types.ObjectId,
  },
  unpackable: {
    type: Boolean,
    default: false
  },
  stockable: {
    type: Boolean,
    default: true

  },
  packQuantity: {
    type: Number,
    default: 0
  },
  branch: [{
    type: Schema.Types.ObjectId,
    ref: 'Branch'
  }]
})

ProductSchema.index({
  name: -1,
  price: -1,
  merchant: -1,
});