import { Sellers } from "../../data/models/seller.model";
import { RetalaServerContext, RetalaUserId, createRetalaSeller, RetalaBranchId } from "../../interfaces/helper";
import { ISeller } from "../../interfaces/seller";
import { GraphQLFieldResolver } from 'graphql';
import { userId } from "../../interfaces/user";
import { Branches } from '../../data/models/branch.model';
import { Merchants } from '../../data/models/merchant.model'
import { verifyAuthJWT } from '../../utils/helper'

/**
 * @function sellers returns a list of all sellers
 */
let sellers: GraphQLFieldResolver<ISeller, RetalaServerContext, any>

sellers = async (parent, args, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  return await Sellers.find({});
}

let findSellerById: GraphQLFieldResolver<ISeller, RetalaServerContext, { id: string }>

findSellerById = async (parent, args, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  return await Sellers.findById(args.id)
}

let findSellerByMerchant: GraphQLFieldResolver<ISeller, RetalaServerContext, { merchantId: userId }>

findSellerByMerchant = async (_parent, { merchantId }, {req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  const sellers = await Sellers.findSellerByMerchant(merchantId)
  console.log(sellers)
  return sellers
}

let getBranchSellers: GraphQLFieldResolver<ISeller, RetalaServerContext, RetalaBranchId>

getBranchSellers = async (_parent, { id }, {req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  const sellers = await Sellers.getBranchSellers(id)
  console.log(sellers)
  return sellers
}

export const SellerQueries = {
  sellers,
  findSellerById,
  findSellerByMerchant,
  getBranchSellers
}

let createSeller: GraphQLFieldResolver<ISeller, RetalaServerContext, createRetalaSeller>

createSeller = async (parent, args, { req, res }) => {
  const seller = await Sellers.createSeller(args.newSellerParams);
  return seller;
}

// let editSeller: GraphQLFieldResolver<ISeller>

export const SellerMutations = {
  createSeller,
}

let branch: GraphQLFieldResolver<ISeller, RetalaServerContext>;
branch = async (parent, _, _context) => {
  let branch = await Branches.findById(parent.branch);
  return branch;
}

let merchant: GraphQLFieldResolver<ISeller, RetalaServerContext>;
merchant = async (parent, _, _context) => {
  let merchant = await Merchants.findById(parent.merchant);
  return merchant
}

export const Seller = {
  branch,
  merchant
}