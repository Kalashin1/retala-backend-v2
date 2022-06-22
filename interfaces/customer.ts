import { Document, Model  } from "mongoose";
import { branchId } from './branch'
import { IOrder } from './order'
import { merchantId } from './merchant'
import { userId } from "./user";

export interface ICustomer extends Document {
  name: string
  phone: string
  bill: number
  branch: branchId
  merchant:merchantId
  transactions: [IOrder]
}

export type customerId = userId

export type createCustomerParams = {
  name: string
  phone: string
  merchant:merchantId
}

export interface ICustomerModel extends Model<ICustomer> {
  createCustomer: (params: createCustomerParams) => Promise<ICustomer>
  getCustomer: (id: customerId) => Promise<ICustomer> | Promise<boolean>
  deleteCustomer: (id: customerId) => Promise<boolean>
  getCustomers: () => Promise<ICustomer[]>
  findMerchantsCustomers: (id: merchantId) => Promise<ICustomer[]>
  searchCustomers: (id: merchantId, customerName: string) => Promise< ICustomer[]>
  editCustomer: (id: customerId, name: string, phone: string) => Promise<boolean>
}