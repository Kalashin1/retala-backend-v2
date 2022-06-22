import { Request, Response } from 'express';
import { Context } from 'apollo-server-core';
import { 
  createUserAccountParams,
  userId,
  editUserAccountParams,
  userEmail,
  userPhoneNumber
} from './user';

import { 
  createSellerParams,
  sellerId,
  editSellerParams
} from './seller';

import { 
  createMerchantParams,
  editMerchantParams,
  merchantId,
  updateSettingsParams
} from './merchant';
import { 
  branchId,
  createBranchParams, EditBranchParams } from './branch'
import { createCustomerParams } from './customer';
import { customerId } from './customer';
import { 
  createProductParams,
  productId,
  ProductSearchParams,
  unpackProductParams
} from './products';
import { createPaymentParams, paymentId } from './payment';
import { createQuantityParams, quantityId } from './quantity';
import { 
  changeRestockParams,
  changeTransferParams,
  createRestockParams,
  restockByBranches
} from './restock';
import { createPlanParams, planId } from './plan';
import { 
  createOrderParams,
  getBranchOrderParams,
  OrderId
} from './order';
import {  } from './seller'
import { ObjectId } from 'mongodb';

export type primiveContext = {
  res: Response
  req: Request
}

export type createRetalaUser = {
  newUserParams: createUserAccountParams
}

export type LoginUserParams = {
  email?: string
  phone?: string
  password: string
}

export type ResetPasswordParams = {
  password: string
  token: string
  id: userId
}

export type userJWT = {
  token: string
}

export type createRetalaSeller = {
  newSellerParams: createSellerParams
}

export type RetalaUserId = {
  id: userId
}

export type RetalaUserEmail = {
  email: userEmail
}

export type RetalaMerchantId = {
  id: merchantId
}

export type RetalaBranchId = {
  id: branchId
}

export type EditRetalaMerchantParams = {
  id: merchantId
  params: editMerchantParams
}

export type RetalaUserPhone = {
  phoneNumber: userPhoneNumber
}

export type updateRetalaUser = {
  updateUserParams: editUserAccountParams
  id: userId
}

export type RetalaServerContext = Context<primiveContext>

export type CreateRetalaMerchantParams = {
  MerchantParams: createMerchantParams
  BranchParams: createBranchParams
}

export type CreateRetalaBranchParams = {
  params: createBranchParams
}

export type GetBatchBranchProductsParams = {
  merchantId: merchantId,
  branchId: branchId
}

export type EditRetalaBranchParams = {
  branchId: branchId,
  params: EditBranchParams
}

export type CreateRetalaCustomerParams = {
  params: createCustomerParams
}

export type RetalaCustomerId = {
  id: customerId
}

export type RetalaCustomerSearchParams = {
  id: merchantId
  customerName: string
}

export type EditRetalaCustomerParams = {
  id: customerId
  name: string
  phone: string
}

export type CreateRetalaProductsParams = {
  params: createProductParams
}

export type RetalaProductId = {
  id: productId
}

export type getProductDetailsByBranchesParams = {
  merchant: merchantId,
  branch: branchId
}

export type EditRetalaProductParams = {
  id: productId,
  params: createProductParams
}

export type RetalaProductSearchParams = {
  searchParams: ProductSearchParams
}

export type UnpackRetalaProductParams = {
  unpackParams: unpackProductParams
}

export type CreateRetalaPaymentParams = {
  params: createPaymentParams
}

export type RetalaPaymentId = {
  id: paymentId
}

export type CreateRetalaQuantityParams = {
  params: createQuantityParams
}

export type RetalaQuantityId = {
  id: quantityId
}

export type GetBranchQuantitiesParams = {
  product: productId
  branch: branchId
}

export type RestockByBranchesParams = {
  params: restockByBranches
}

export type ChangeRestockParams = {
  params: changeRestockParams
  id: ObjectId
}

export type CreateRestockParams = {
  params: createRestockParams
}

export type ChangeTransferParams = {
  params: changeTransferParams
}

export type CreateRetalaSubPlan = {
  params: createPlanParams
}

export type RetalaSubPlanId = {
  id: planId
}

export type EditRetalaSubPlan = {
  id: planId
  params: createPlanParams
}

export type CreateOrderParams = {
  params: createOrderParams
}

export type RetalaOrderId = {
  id: OrderId
}

export type GetBranchOrderParams = {
  params: getBranchOrderParams
}

export type EditOrderParams = {
  id: OrderId
  params: createOrderParams
}

export type EditSeller = {
  seller: sellerId,
  params: editSellerParams
}

export type ReturnOrderType = {
  id: OrderId,
  comment: string
}

export type UpdatMerchantSettings = {
  id: merchantId,
  setting: updateSettingsParams
}