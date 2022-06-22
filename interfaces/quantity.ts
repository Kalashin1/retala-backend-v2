import { ObjectID } from "bson";
import { Document, Model, ObjectId } from "mongoose";
import { branchId } from "./branch";
import { IProduct, productId } from './products'

export interface IQuantity extends Document {
  product: ObjectId
  branch: ObjectId
  quantity: number
  price: number
}

export type createQuantityParams = {
  product: ObjectId
  branch: ObjectId
  quantity: number
  price: number
}

export type quantityId = ObjectId | ObjectID | string

export type getBranchQuantitiesParams = {
  product: productId
  branch: branchId
}

export interface IQuantityModel extends Model<IQuantity>{
  createQuantity: (params: createQuantityParams) => Promise<IQuantity>
  getQuantity: (id: quantityId) => Promise<IQuantity> | Promise<boolean>
  getProductQuantities: (id: productId) => Promise<IQuantity[]> | Promise<boolean>
  getBranchQuantities: (param: getBranchQuantitiesParams) => Promise<IProduct[]> | Promise<boolean>
  deleteQuantity: (id: quantityId) => Promise<boolean>
}