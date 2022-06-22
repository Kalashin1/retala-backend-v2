import { model } from 'mongoose';
import { ISeller, ISellerModel, createSellerParams, sellerId, editSellerParams } from '../../interfaces/seller';
import { SellerSchema } from '../schemas/seller.schema';
import { hashPassword } from '../../utils/helper'
import { Merchants } from './merchant.model'
import { merchantId } from '../../interfaces/merchant';
import { Branches } from './branch.model'
import { branchId } from '../../interfaces/branch'
import { userId } from '../../interfaces/user';


SellerSchema.pre('save', async function(){
  if(this.password.length < 20){
    const newPassword = await hashPassword(this.password);
    this.password = newPassword;
  }
  return
})

SellerSchema.statics.createSeller = async function (params: createSellerParams){
  const branch = await Branches.findOne({ merchant: params.merchant})
  if (!branch) return
  const merchant = await Merchants.findById(params.merchant);
  if (!merchant) return
  if (params.branch === "") params.branch = branch._id
  const seller = await this.create(params);
  return seller;
}

SellerSchema.statics.deleteSalesPerson = async function (id:userId) {
  const seller:ISeller = await this.findById(id)
  if(!seller) return false;
  await seller.deleteOne()
  return true;
}


SellerSchema.statics.findSellerByMerchant = async function (merchantId:userId) {
  return this.find({ merchant: merchantId })
}

SellerSchema.statics.editSeller = async function(id: sellerId, params: editSellerParams) {
  const seller = await this.findById(id);
  if(seller){
    await seller.updateOne(params);
    return true
  }
  return false
}

SellerSchema.statics.getBranchSellers = async function (id: branchId) {
  const sellers = await this.find({ branch: id })
  return sellers
}

SellerSchema.statics.getMerchantSellers = async function (id: merchantId){ 
  const sellers = await this.find({ merchant: id });
  return sellers;
}

export const Sellers = model<ISeller, ISellerModel>('seller', SellerSchema);