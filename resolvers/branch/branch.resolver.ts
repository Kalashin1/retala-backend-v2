import { Branches } from '../../data/models/branch.model'
import { IBranch } from '../../interfaces/branch'
import { GraphQLFieldResolver } from 'graphql'
import { RetalaServerContext, CreateRetalaBranchParams, RetalaBranchId, EditRetalaBranchParams, RetalaMerchantId } from '../../interfaces/helper'
import { Merchants } from '../../data/models/merchant.model'
import { verifyAuthJWT } from '../../utils/helper'

let branches: GraphQLFieldResolver<IBranch, RetalaServerContext>
branches = async (_parent, _args, { res, req }) => {
  const { usertoken } = req.headers
  let _res = await verifyAuthJWT(usertoken.toString())
  if(!_res){
    throw Error("You are not authenticated")
  }
  return Branches.getAllBranches()
}

let branch: GraphQLFieldResolver<IBranch, RetalaServerContext, RetalaBranchId>
branch = async (_parent, args, { res, req }) => {
  const { usertoken } = req.headers
  let _res = await verifyAuthJWT(usertoken.toString())
  if(!_res){
    throw Error("You are not authenticated")
  }
  return await Branches.getBranch(args.id)
}


let findMerchantBranches: GraphQLFieldResolver<IBranch, RetalaServerContext, RetalaMerchantId>
findMerchantBranches = async (_parent, args, { res, req }) => {
  const { usertoken } = req.headers
  let _res = await verifyAuthJWT(usertoken.toString())
  if(!_res){
    throw Error("You are not authenticated")
  }
  return await Branches.findMerchantBranches(args.id)
}

export const BranchQueries = {
  branches,
  branch,
  findMerchantBranches
}


let createRetalaBranch: GraphQLFieldResolver<IBranch, RetalaServerContext, CreateRetalaBranchParams>
createRetalaBranch = async (_parent, args, { req, res }) => {
  const { usertoken } = req.headers
  if(!usertoken){
    throw Error("User token not provided");
  }
  let _res = await verifyAuthJWT(usertoken.toString())
  if(!_res){
    throw Error("You are not authenticated")
  }
  return await Branches.createNewBranch(args.params)
}

let editRetalaBranch: GraphQLFieldResolver<IBranch, RetalaServerContext, EditRetalaBranchParams>
editRetalaBranch = async (_parent, args, { req, res }) => {
  const { usertoken } = req.headers
  if(!usertoken){
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if(!_res){
    throw Error("You are not authenticated")
  }
  const status = await Branches.editBranch(args.branchId, args.params);
  const branch = await Branches.getBranch(args.branchId)
  return { status, data: branch._id }
}

let deleteRetalaBranch: GraphQLFieldResolver<IBranch, RetalaServerContext, { branchId: string }>
deleteRetalaBranch = async (_parent, args, { res, req }) => {
  const { usertoken } = req.headers
  if(!usertoken){
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if(!_res){
    throw Error("You are not authenticated")
  }
  const status = await Branches.deleteBranch(args.branchId)
  return { status, data: args.branchId }
}

export const BranchMutations = {
  createRetalaBranch,
  editRetalaBranch,
  deleteRetalaBranch
}

let merchant: GraphQLFieldResolver<IBranch, RetalaServerContext>;
merchant = async (parent, _, _context) => {
  let merchant = await Merchants.findById(parent.merchant);
  console.log(merchant)
  return merchant
}

export const Branch = {
  merchant
}