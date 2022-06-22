import {
  IRestock,
  RestockProduct
} from '../../interfaces/restock';
import { GraphQLFieldResolver } from 'graphql';
import { Branches } from '../../data/models/branch.model';
import { Products } from '../../data/models/product.model';
import { Sellers } from '../../data/models/seller.model'
import { verifyAuthJWT } from '../../utils/helper';
import {
  RestockByBranchesParams,
  CreateRestockParams,
  ChangeRestockParams,
  ChangeTransferParams,
  RetalaServerContext
} from '../../interfaces/helper';
import { UserInputError } from 'apollo-server'
import { Restocks } from '../../data/models/restock.model';

let addNewRestock: GraphQLFieldResolver<IRestock, RetalaServerContext, CreateRestockParams>;
addNewRestock = async (_parent, { params }, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  const newRestock = await Restocks.addNewRestock(params)
  return newRestock;
}

let changeRestock: GraphQLFieldResolver<IRestock, RetalaServerContext, ChangeRestockParams>;
changeRestock = async (_parent, { params }, { req, res }) => {
  try {
    const { usertoken } = req.headers
    if (!usertoken) {
      throw Error("User token not provided");
    }
    let _res = verifyAuthJWT(usertoken.toString())
    if (!_res) {
      throw Error("You are not authenticated")
    }
    const changeRestock = await Restocks.changeRestock(params);
    return changeRestock;
  } catch (error) {
    return new UserInputError(error.message)
  }
}

let changeTransfer: GraphQLFieldResolver<IRestock, RetalaServerContext, ChangeTransferParams>;
changeTransfer = async (_parent, { params }, { req, res }) => {
  try {
    const { usertoken } = req.headers
    if (!usertoken) {
      throw Error("User token not provided");
    }
    let _res = verifyAuthJWT(usertoken.toString())
    if (!_res) {
      throw Error("You are not authenticated")
    }
    const changeTransfer = await Restocks.changeTransfer(params);
    return changeTransfer;
  } catch (error) {
    return new UserInputError(error.message)
  }
}

let restockByBranches: GraphQLFieldResolver<IRestock, RetalaServerContext, RestockByBranchesParams>;
restockByBranches = async (_parent, { params }, { req, res }) => {
   const { usertoken } = req.headers
    if (!usertoken) {
      throw Error("User token not provided");
    }
    let _res = verifyAuthJWT(usertoken.toString())
    if (!_res) {
      throw Error("You are not authenticated")
    }
    const restock = await Restocks.restocksByBranches(params);
    console.log(restock)
    return restock;
}

export const RestockMutations = {
  addNewRestock,
  changeRestock,
  changeTransfer,
  restockByBranches
}

let branch: GraphQLFieldResolver<IRestock, RetalaServerContext>;
branch = async (parent, _, _context) => {
  const branch = await Branches.findById(parent.branch);
  return branch
}

let receiveBranch: GraphQLFieldResolver<IRestock, RetalaServerContext>;
receiveBranch = async (parent, _, _context) => {
  const receiveBranch = await Branches.findById(parent.receiveBranch);
  // console.log(receiveBranch)
  return receiveBranch;
}

let seller: GraphQLFieldResolver<IRestock, RetalaServerContext>;
seller = async (parent, _, _context) => {
  const seller = await Sellers.findById(parent.seller);
  return seller
}




let items: GraphQLFieldResolver<IRestock, RetalaServerContext>;
items = async (parent, _, _context) => {
  const items = parent.items.map(async (item: RestockProduct) => {
    return await Products.findById(item.product)
  });
  return items;
}
export const Restock = {
  branch,
  receiveBranch,
  seller,
  items
}