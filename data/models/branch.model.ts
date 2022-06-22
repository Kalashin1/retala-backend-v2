import { model, Model } from 'mongoose';
import { IBranch, IBranchModel, createBranchParams, branchId, EditBranchParams } from '../../interfaces/branch';
import { merchantId } from '../../interfaces/merchant';
import { BranchSchema } from '../schemas/branch.schema';

BranchSchema.statics.createNewBranch = async function (params: createBranchParams) {
  const branchName = params.name ? params.name: 'Main';
  const newBranch = await this.create({ name: branchName, merchant: params.merchant.toString().trim()})
  return newBranch;
}

BranchSchema.statics.getBranch = async function(id: branchId){
  const branch = await this.findById(id.toString().trim())
  if (!branch) return;
  return branch
}

BranchSchema.statics.deleteBranch = async function(id: branchId){
  // console.log(id)
  const branch = await this.findOne({ _id: id.toString().trim() });
  // console.log(await this.find({}))
  // console.log(branch)
  if(!branch) return false;
  await branch.deleteOne();
  return true
}

BranchSchema.statics.getAllBranches = async function(){
  return await this.find({});
}

BranchSchema.statics.findMerchantBranches = async function (id:merchantId) {
  const merchantsBranches = await this.find({ merchant: id.toString().trim() })
  console.log(merchantsBranches)
  return merchantsBranches
}

BranchSchema.statics.editBranch = async function (branchId: branchId, param: EditBranchParams){
  const branch = await this.findById(branchId.toString().trim());
  if(branch){
    await branch.updateOne(param);
    return true;
  }
  return false;
}

export const Branches = model<IBranch, IBranchModel>('branch', BranchSchema);