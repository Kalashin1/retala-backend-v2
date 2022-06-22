import {
  model
} from 'mongoose'
import { Products } from './product.model' 
import { Branches } from './branch.model'
import {
  IRestock,
  IRestockModel,
  createRestockParams,
  changeRestockParams,
  changeTransferParams,
  restockByBranches
} from '../../interfaces/restock'

import {
  Quantities
} from './quantity.model'

import {
  RestockSchema
} from '../schemas/restock.schema'

RestockSchema.statics.addNewRestock = async function (params: createRestockParams) {
  const restock = await model('restock').create(params);
  // console.log(restock);
  return restock;
}

RestockSchema.statics.changeRestock = async function (params: changeRestockParams) {
  let restock = await this.findOne({ _id: params.restockId })
  // console.log(restock)
  restock.status = params.status;
  restock.save();
  if (restock.status == true) {
    let branch = await Branches.findById(restock.branch)
    console.log(branch.name)
    restock.items.forEach(async (element) => {
      console.log(element)
      let quantity = await Quantities.find({
        product: element.product
      })
      quantity.forEach(async (quantity) => { 
        quantity.quantity += element.quantity;
        await quantity.updateOne({ quantity: element.quantity});
        console.log(quantity)
      } )
    })
  }
  return restock
}

RestockSchema.statics.changeTransfer = async function (params: changeTransferParams) {
  let restock = await this.findById(params.restockId).sort({
    createdAt: -1
  });
  restock.status = params.status;
  restock.save();
  
  return restock
}

RestockSchema.statics.restocksByBranches = async function (params: restockByBranches) {
  var date = new Date(params.date);
  if (!params.date){
    date = new Date()
  }
  console.log(date);

  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  let restock = await this.find({
    branch: params.branchId,
    status: false,
    createdAt: {
      $gte: new Date(firstDay.setHours(0, 0, 0)),
      $lt: new Date(lastDay.setHours(23, 59, 59))
    }
  }).sort({
    createdAt: -1
  });
  return restock
}

export const Restocks = model<IRestock, IRestockModel>('restock', RestockSchema);