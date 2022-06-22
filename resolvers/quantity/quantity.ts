import { IQuantity } from '../../interfaces/quantity';
import { Quantities } from '../../data/models/quantity.model';
import { Branches } from '../../data/models/branch.model';
import { Products } from '../../data/models/product.model';
import {
  RetalaServerContext,
  CreateRetalaQuantityParams,
  RetalaQuantityId,
  RetalaBranchId,
  GetBranchQuantitiesParams
} from '../../interfaces/helper';
import { GraphQLFieldResolver } from 'graphql';
import { verifyAuthJWT } from '../../utils/helper';
import { UserInputError } from 'apollo-server';

let getQuantity: GraphQLFieldResolver<IQuantity, RetalaServerContext, RetalaQuantityId>;
getQuantity = async (_parent, { id }, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  let quantity = await Quantities.getQuantity(id)
  return quantity
}

let getQuantities: GraphQLFieldResolver<IQuantity, RetalaServerContext>;
getQuantities = async (_parent, args, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  const quantities = await Quantities.find({});
  return quantities;
}

let getBranchQuantities: GraphQLFieldResolver<IQuantity, RetalaServerContext, GetBranchQuantitiesParams>;
getBranchQuantities = async (_parent, args, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  const quantities = await Quantities.getBranchQuantities(args);
  return quantities;
}


export const QuantityQueries = {
  getQuantities,
  getQuantity,
  getBranchQuantities
}

let createRetalaQuantity: GraphQLFieldResolver<IQuantity, RetalaServerContext, CreateRetalaQuantityParams>;
createRetalaQuantity = async (_parent, { params }, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  const quantity = await Quantities.createQuantity(params);
  return quantity;
} 

let deleteQuantity: GraphQLFieldResolver<IQuantity, RetalaServerContext, RetalaQuantityId>;
deleteQuantity = async (_parent, { id }, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  const result = await Quantities.deleteQuantity(id);
  return result;
}


export const QuantityMutations = {
  createRetalaQuantity,
  deleteQuantity
}


let branch: GraphQLFieldResolver<IQuantity, RetalaServerContext>
branch = async (parent, _, _context) => {
  const branch = await Branches.findById(parent.branch)
  return branch
}

let product: GraphQLFieldResolver<IQuantity, RetalaServerContext>;
product = async (parent, _, args) => {
  const product = await Products.findById(parent.product);
  console.log(product)
  return product
}


export const Quantity = {
  branch,
  product
}