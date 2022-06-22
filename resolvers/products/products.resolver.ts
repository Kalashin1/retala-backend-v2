import { IProduct } from "../../interfaces/products";
import { Products } from '../../data/models/product.model';
import { UserInputError } from "apollo-server";
import { Quantities } from '../../data/models/quantity.model';
import { GraphQLFieldResolver } from "graphql";
import { Merchants } from "../../data/models/merchant.model";
import { Branches } from "../../data/models/branch.model";
import { verifyAuthJWT } from "../../utils/helper";
import {
  CreateRetalaProductsParams,
  RetalaServerContext,
  RetalaProductId,
  RetalaMerchantId,
  getProductDetailsByBranchesParams,
  RetalaBranchId,
  EditRetalaProductParams,
  RetalaProductSearchParams,
  UnpackRetalaProductParams,
  GetBatchBranchProductsParams,
} from '../../interfaces/helper';

let getProducts: GraphQLFieldResolver<IProduct, RetalaServerContext>;
getProducts = async (_parent, args, { req, res }) => {
  try {
    const { usertoken } = req.headers
    if (!usertoken) {
      throw Error("User token not provided");
    }
    let _res = verifyAuthJWT(usertoken.toString())
    if (!_res) {
      throw Error("You are not authenticated")
    }
    const product = await Products.getProducts()
    return product;
  } catch (error) {
    return new UserInputError(error.message)
  }
}

let getProduct: GraphQLFieldResolver<IProduct, RetalaServerContext, RetalaProductId>;
getProduct = async (_parent, args, { req, res }) => {
  try {
    const { usertoken } = req.headers
    if (!usertoken) {
      throw Error("User token not provided");
    }
    let _res = verifyAuthJWT(usertoken.toString())
    if (!_res) {
      throw Error("You are not authenticated")
    }
    const product = await Products.getProduct(args.id);
    return product;
  } catch (error) {
    return new UserInputError(error.message)
  }
};


let getMerchantProducts: GraphQLFieldResolver<IProduct, RetalaServerContext, RetalaMerchantId>;
getMerchantProducts = async (_parent, args, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  const products = await Products.getMerchantProducts(args.id);
  return products;
}

let getProductDetailsByBranches: GraphQLFieldResolver<IProduct, RetalaServerContext, getProductDetailsByBranchesParams>;
getProductDetailsByBranches = async (_parent, args, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  const products = await Products.getProductDetailsByBranches(args.merchant, args.branch);
  return products;
};

let getProductsByBranches: GraphQLFieldResolver<IProduct, RetalaServerContext, RetalaBranchId>;
getProductsByBranches = async (_parent, args, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  const products = await Products.getProductsByBranches(args.id);
  console.log(products)
  return products;
}

let search: GraphQLFieldResolver<IProduct, RetalaServerContext, RetalaProductSearchParams>;
search = async (_parent, { searchParams }, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  // console.log(searchParams)
  const products = await Products.search(searchParams);
  return products;
}

let getBatchBranchProducts: GraphQLFieldResolver<IProduct, RetalaServerContext, GetBatchBranchProductsParams>;
getBatchBranchProducts = async (_parent, { merchantId, branchId }, { req, res } ) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  return await Products.getBatchBranchProducts(merchantId, branchId);
}

export const ProductQueries = {
  getProducts,
  getProduct,
  search,
  getProductsByBranches,
  getProductDetailsByBranches,
  getMerchantProducts,
  getBatchBranchProducts
}

let createNewProduct: GraphQLFieldResolver<IProduct, RetalaServerContext, CreateRetalaProductsParams>;
createNewProduct = async (_parent, args, { req, res }) => {
  try {
    const { usertoken } = req.headers
    if (!usertoken) {
      throw Error("User token not provided");
    }
    let _res = verifyAuthJWT(usertoken.toString())
    if (!_res) {
      throw Error("You are not authenticated")
    }
    const product = await Products.createNewProduct(args.params);
    return product;
  } catch (error) {
    return new UserInputError(error.message)
  }
}

let editProduct: GraphQLFieldResolver<IProduct, RetalaServerContext, EditRetalaProductParams>;
editProduct = async (_parent, args, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  const result = await Products.editProduct(args.id, args.params);
  return result;
}

let deleteProduct: GraphQLFieldResolver<IProduct, RetalaServerContext, RetalaProductId>;
deleteProduct = async (_parent, { id }, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  const returnType = await Products.deleteProduct(id);
  return returnType
}

let unpackProducts: GraphQLFieldResolver<IProduct, RetalaServerContext, UnpackRetalaProductParams>;
unpackProducts = async (_parent, { unpackParams }, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  const products = await Products.unpackProducts(unpackParams);
  return products;
}

export const ProductMutations = {
  createNewProduct,
  editProduct,
  deleteProduct,
  unpackProducts
}

let branch: GraphQLFieldResolver<IProduct, RetalaServerContext>;
branch = async (parent, _, _context) => {
  let branch = await Branches.findById(parent.branch);
  return branch;
}

let merchant: GraphQLFieldResolver<IProduct, RetalaServerContext>;
merchant = async (parent, _, _context) => {
  let merchant = await Merchants.findById(parent.merchant);
  return merchant
}

let quantity: GraphQLFieldResolver<IProduct, RetalaServerContext>;
quantity = async (parent, _, _context) => {
  let quantity = await Quantities.findOne({ product: parent._id });
  return quantity;
}
export const Product = {
  branch,
  merchant,
  quantity
}