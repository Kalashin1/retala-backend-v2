import { Merchants } from '../../data/models/merchant.model'
import { verifyAuthJWT } from '../../utils/helper'
import { GraphQLFieldResolver } from 'graphql'
import { SubPlans } from '../../data/models/plan.model'
import { Branches } from '../../data/models/branch.model'
import { IMerchant } from '../../interfaces/merchant'
import { Users } from '../../data/models/user.model'
import {
  CreateRetalaMerchantParams,
  RetalaServerContext,
  EditRetalaMerchantParams,
  RetalaMerchantId,
  UpdatMerchantSettings
} from '../../interfaces/helper'

let merchants: GraphQLFieldResolver<IMerchant, RetalaServerContext>
merchants = async (_parent, _args, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  return await Merchants.find({})
}

let findMerchantById: GraphQLFieldResolver<IMerchant, RetalaServerContext, RetalaMerchantId>
findMerchantById = async (_parent, args, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  return await Merchants.findById(args.id)
}

export const MerchantQueries = {
  merchants,
  findMerchantById
}

let createRetalaMerchant: GraphQLFieldResolver<IMerchant, RetalaServerContext, CreateRetalaMerchantParams>
createRetalaMerchant = async (_parent, args, { req, res }) => {
  const { usertoken } = req.headers
  if(!usertoken){
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if(!_res){
    throw Error("You are not authenticated")
  }
  return await Merchants.createMerchant(args.MerchantParams, args.BranchParams)
}

let editRetalaMerchant: GraphQLFieldResolver<IMerchant, RetalaServerContext, EditRetalaMerchantParams>
editRetalaMerchant = async (_parent, args, { req, res}) => {
  const { usertoken } = req.headers
  if(!usertoken){
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if(!_res){
    throw Error("You are not authenticated")
  }
  return await Merchants.editMerchant(args.id, args.params)
}

let deleteRetalaMerchant: GraphQLFieldResolver<IMerchant, RetalaServerContext, RetalaMerchantId>
deleteRetalaMerchant = async (_parent, args, { req, res }) => {
  const { usertoken } = req.headers
  if(!usertoken){
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if(!_res){
    throw Error("You are not authenticated")
  }
  return await Merchants.deleteMerchant(args.id)
}


let updateMerchantSetting: GraphQLFieldResolver<IMerchant, RetalaServerContext, UpdatMerchantSettings>;
updateMerchantSetting = async (_, { id, setting }, { req, res }) => {
  const { usertoken } = req.headers
  if(!usertoken){
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if(!_res){
    throw Error("You are not authenticated")
  }
  const result = await Merchants.updateMerchantSettings(id, setting)
  if(!result){
    return {
      status: result,
      data: null
    }
  }
  const merchant = await Merchants.findById(id);
  return { 
    status: true,
    data: result,
    merchant
  }
}

export const MerchantMutations = {
  createRetalaMerchant,
  editRetalaMerchant,
  deleteRetalaMerchant,
  updateMerchantSetting
}

let owner: GraphQLFieldResolver<IMerchant, RetalaServerContext>;
owner = async (parent, _, _context) => {
  const owner = await Users.findUserById(parent.owner);
  return owner;
}

let branches: GraphQLFieldResolver<IMerchant, RetalaServerContext>;
branches = async (parent, _, _context) => {
  const branches = await Branches.find({ merchant: parent._id });
  return branches
}

let setting: GraphQLFieldResolver<IMerchant, RetalaServerContext>;
setting = async (parent, _, context) => {
  let setting = parent.setting;
  const plan = await SubPlans.findById(setting.planId);
  setting.plan = plan;
  return setting
}

export const Merchant = {
  owner,
  branches,
  setting
}