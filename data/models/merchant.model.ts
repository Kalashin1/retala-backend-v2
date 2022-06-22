import { model } from 'mongoose';
import { IMerchant, IMerchantModel, createMerchantParams, merchantId, editMerchantParams, updateSettingsParams } from '../../interfaces/merchant';
import { Branches } from './branch.model'
import { MerchantSchema } from '../schemas/mechant.schema'
import { createBranchParams } from '../../interfaces/branch';

MerchantSchema.statics.createMerchant = async function(obj: createMerchantParams, branchObj: createBranchParams){
  const merchant = await this.create(obj);
  branchObj.merchant = merchant._id;
  await Branches.createNewBranch(branchObj);
  return merchant;
}

MerchantSchema.statics.merchant = async function (param:merchantId) {
  const merchant:IMerchant = await this.findById(param)
  if(!merchant) return;
  return merchant;
}

MerchantSchema.statics.editMerchant = async function (id: merchantId, params: editMerchantParams) {
  const merchant = await this.findById(id)
  if(!merchant) return
  await merchant.updateOne(params);
  return await this.findById(merchant._id)
} 

MerchantSchema.statics.deleteMerchant = async function (param:merchantId) {
  const merchant:IMerchant = await this.findById(param)
  if(!merchant) return false;
  await merchant.deleteOne;
  return false;
}

MerchantSchema.statics.updateMerchantSettings = async function (id: merchantId, setting: updateSettingsParams) {
  const merchant = await this.findById(id);
  if(merchant){
    merchant.setting.notification = setting.notification
    merchant.setting.tax = setting.tax
    merchant.setting.printer = setting.printer;
    await merchant.save()
    return merchant._id
  }
  return false;
}


export const Merchants = model<IMerchant, IMerchantModel>('merchant', MerchantSchema);