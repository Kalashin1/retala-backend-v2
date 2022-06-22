import { Document, Model, ObjectId } from "mongoose";
import { IBranch, branchId } from './branch'
import { IMerchant, merchantId } from "./merchant";

export interface IProduct extends Document {
  name: string
  _id: ObjectId
  merchant: ObjectId
  image: string
  barcode: string
  price: number
  costPrice: number
  quantity: number
  minimumStock: number
  packProduct: ObjectId
  unpackable: boolean
  stockable: boolean
  packQuantity: number
  branch: ObjectId
}

export type createProductParams = {
  name: string
  quantity: number
  barcode: string
  /**
   * @field don't know what this does yet
   */
  branch: IBranch[] | string[] | ObjectId[]
  costPrice: number
  price: number
  minimumStock: number
  merchant: IMerchant
  stockable: boolean
  unpackable?: boolean
}

export type productId = ObjectId | string

export type productDetailByBranchesReturnType = {
  count: number
  networth: number
}


export type ProductSearchParams = {
  term: string
  merchant: merchantId
  branch: branchId
}

export type unpackProductParams = {
  productId: ObjectId,
  packProduct: ObjectId
  branchId: ObjectId
  quantity: number
}

export interface IProductModel extends Model<IProduct> {
  createNewProduct: (params: createProductParams) => Promise<IProduct>
  getProduct: (id: productId) => Promise<IProduct | boolean>
  getProducts: () => Promise<IProduct[]>
  editProduct: (id: productId, params: createProductParams) => Promise<IProduct | boolean>
  deleteProduct: (id: productId) => Promise<boolean>
  getProductsByBranches: (id: branchId) =>  Promise<IProduct[]>
  getMerchantProducts: (id: merchantId) =>  Promise<IProduct[] | boolean>
  getBatchBranchProducts: (merchantId: merchantId, branchId: branchId) => Promise<IProduct[]>;
  getProductDetailsByBranches: (merchant: merchantId, branch: branchId) => Promise<productDetailByBranchesReturnType>
  unpackProducts: (params: unpackProductParams) => Promise<IProduct[]>
  search:(params: ProductSearchParams) => Promise<IProduct>
}