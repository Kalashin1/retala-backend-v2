import { Document, Model, ObjectId } from "mongoose";

export interface IRestock extends Document {
  branch: ObjectId
  type: string
  receiveBranch: ObjectId
  status: boolean
  items: []
  seller: ISeller
}

export type RestockProduct = {
  product: string
  quantity: number
}

export interface createRestockParams {
  branch: ObjectId
  items: RestockProduct[]
  type: string
  receiveBranch: ObjectId
  seller: ObjectId
}

export type changeRestockParams = {
  restockId: ObjectId
  status: boolean
}

export type changeTransferParams = {
  restockId: ObjectId
  branch: ObjectId
  receiveBranch: ObjectId
  status: boolean
}

export type restockByBranches = {
  branchId: ObjectId
  date: string | number
}

export interface IRestockModel extends Model<IRestock> {
  addNewRestock: (params: createRestockParams) => Promise<IRestock>
  changeRestock: (params: changeRestockParams) => Promise<IRestock | boolean>
  changeTransfer: (params: changeTransferParams) => Promise<IRestock | boolean>
  restocksByBranches: (params: restockByBranches) => Promise<IRestock | boolean>
}

interface ISeller {
  type: String
  id: ObjectId
  name: String
}

