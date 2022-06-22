import { createCustomerParams, customerId, ICustomer, ICustomerModel } from "../../interfaces/customer";
import { model } from "mongoose";
import { CustomerSchema } from "../schemas/customer.schema";
import { merchantId } from '../../interfaces/merchant'

CustomerSchema.statics.createCustomer = async function (params:createCustomerParams) {
  params.phone = params.phone.trim()
  params.name = params.name.toLowerCase()
  return await this.create(params)
}

CustomerSchema.statics.getCustomer = async function (id:customerId) {
  const customer = await this.findById(id);
  let bool: boolean;
  if(!customer){
    return bool = false;
  }
  return customer
}

CustomerSchema.statics.getCustomers = async function(){
  return this.find({})
}

CustomerSchema.statics.deleteCustomer = async function(id:customerId) {
  const customer = await this.findById(id);
  let bool = true;
  customer ? await customer.deleteOne() : bool = false;
  return bool;
}

CustomerSchema.statics.editCustomer = async function(id: customerId, name: string, phone: string) {
  const customer = await this.findById(id);
  let bool: boolean;
  if(!customer){
    return bool = false;
  }
  await customer.updateOne({ name, phone })
  return true
}

CustomerSchema.statics.findMerchantsCustomers = async function(id:merchantId){
  return await this.find({
    merchant: id
  })
}

CustomerSchema.statics.searchCustomers = async function(id:merchantId, name: string){
  name = name.toLowerCase()
  let customer = await this.findOne({ merchant: id }).where({ name })
  if(!customer){
    customer = await this.findOne({ merchant: id }).where({ phone: name })
  }
  console.log(customer);
  return customer;
} 


export const Customers = model<ICustomer, ICustomerModel>('customer', CustomerSchema)