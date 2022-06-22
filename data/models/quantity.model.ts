import { model } from 'mongoose'
import { productId } from '../../interfaces/products';
import {
  IQuantity,
  IQuantityModel,
  createQuantityParams,
  quantityId,
  getBranchQuantitiesParams
} from '../../interfaces/quantity'

import { QuantitySchema } from '../schemas/quantity.schema';

QuantitySchema.statics.createQuantity = async function (params: createQuantityParams){
   return await this.create(params);
}

QuantitySchema.statics.getQuantity = async function (id: quantityId) {
  const item = await this.findById(id);
  if(!item){
    throw Error('No Quantity with that ID');
  } else {
    return item;
  }
}

QuantitySchema.statics.getProductQuantities = async function (id:productId) {
  const productQuantities = await this.find({ product: id });
  if(!productQuantities || productQuantities.length < 1) {
    throw Error("No quantity")
  }
  return productQuantities;
}

QuantitySchema.statics.getBranchQuantities = async function (params: getBranchQuantitiesParams) {
  const branchQuantities = await this.find(params);
  if(!branchQuantities || branchQuantities.length < 1) {
    throw Error("No quantity")
  }
  return branchQuantities;
}

QuantitySchema.statics.deleteQuantity = async function (id:quantityId) {
  const quantity = await this.findByIdAndDelete(id)
  if(!quantity){
    return false;
  }
  return true
}


export const Quantities = model<IQuantity, IQuantityModel>('quantity', QuantitySchema)