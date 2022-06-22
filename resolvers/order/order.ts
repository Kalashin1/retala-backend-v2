import { Branches } from '../../data/models/branch.model'
import { Sellers } from '../../data/models/seller.model'
import { Payments } from '../../data/models/payment.model'
import { Users } from '../../data/models/user.model'
import { Products } from '../../data/models/product.model'
import { Customers } from '../../data/models/customer.model'
import { verifyAuthJWT } from '../../utils/helper';
import {
  IOrder
} from '../../interfaces/order'
import {
  RetalaServerContext,
  GetBranchOrderParams,
  CreateOrderParams,
  RetalaOrderId,
  EditOrderParams,
  ReturnOrderType
} from '../../interfaces/helper';
import { Orders } from '../../data/models/order.model';
import {
  GraphQLFieldResolver
} from 'graphql';
import {
  UserInputError
} from 'apollo-server';

let order: GraphQLFieldResolver<IOrder, RetalaServerContext, RetalaOrderId>;
order = async (_parent, { id }, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  const order = await Orders.getOrder(id)
  return order
}

let orders: GraphQLFieldResolver<IOrder, RetalaServerContext>;
orders = async (_parent, _, { req, res }) => {
  try {
    const { usertoken } = req.headers
    if (!usertoken) {
      throw Error("User token not provided");
    }
    let _res = verifyAuthJWT(usertoken.toString())
    if (!_res) {
      throw Error("You are not authenticated")
    }
    const orders = await Orders.getAllOrders()
    return orders;
  } catch (error) {
    return new UserInputError(error.message)
  }
}

let getBranchOrders: GraphQLFieldResolver<IOrder, RetalaServerContext, GetBranchOrderParams>;
getBranchOrders = async (_parent, { params }, { req, res }) => {
  try {
    const { usertoken } = req.headers
    if (!usertoken) {
      throw Error("User token not provided");
    }
    let _res = verifyAuthJWT(usertoken.toString())
    if (!_res) {
      throw Error("You are not authenticated")
    }
    const orders = await Orders.getBranchOrders(params);
    return orders;
  } catch (error) {
    return new UserInputError(error.message)
  }
}

export const OrderQueries = {
  order,
  orders,
  getBranchOrders
}

let createOrder: GraphQLFieldResolver<IOrder, RetalaServerContext, CreateOrderParams>;
createOrder = async (_parent, { params }, { req, res }) => {
  const { usertoken } = req.headers
  if(!usertoken){
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if(!_res){
    throw Error("You are not authenticated")
  }
  const order = await Orders.createOrder(params);
  // console.log(order)
  return order
}

let editOrder: GraphQLFieldResolver<IOrder, RetalaServerContext, EditOrderParams>;
editOrder = async (_parent, { id, params }, { req, res }) => {
  const { usertoken } = req.headers
  if(!usertoken){
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if(!_res){
    throw Error("You are not authenticated")
  }
  const result = await Orders.editOrder(id, params)
  return result
}

let deleteOrder: GraphQLFieldResolver<IOrder, RetalaServerContext, RetalaOrderId>;
deleteOrder = async (_parent, { id }, { req, res }) => {
  const { usertoken } = req.headers
  if(!usertoken){
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if(!_res){
    throw Error("You are not authenticated")
  }
  const result = await Orders.findByIdAndDelete(id);
  return result
}

let returnOrder: GraphQLFieldResolver<IOrder, RetalaServerContext, ReturnOrderType>;
returnOrder = async (_, { id, comment }, { req, res }) => {
  const { usertoken } = req.headers
  if(!usertoken){
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if(!_res){
    throw Error("You are not authenticated")
  }
  const data = await Orders.returnOrder(id, comment);
  console.log(data)
  if(!data){
    return {
      status: data,
      data: null,
    }
  }
  return { status: true, data: id }
}


export const OrderMutations = {
  createOrder,
  editOrder,
  deleteOrder,
  returnOrder
}


let branch: GraphQLFieldResolver<IOrder, RetalaServerContext>;
branch = async (parent, _, _context) => {
  const branch = await Branches.getBranch(parent.branch)
  return branch
}

let customer: GraphQLFieldResolver<IOrder, RetalaServerContext>;
customer = async (parent, _, _context) => {
  const customer = await Customers.getCustomer(parent.customer)
  return customer
}

let seller: GraphQLFieldResolver<IOrder, RetalaServerContext>;
seller = async (parent, _, _context) => {
  const seller = await Sellers.findById(parent.seller);
  return seller
}

let user: GraphQLFieldResolver<IOrder, RetalaServerContext>;
user = async (parent, _, _context) => {
  console.log(parent.seller)
  const user = await Users.findById(parent.seller);
  console.log(user)
  return user
}

let orderItems: GraphQLFieldResolver<IOrder, RetalaServerContext>;
orderItems = async ({ orderItems: _orderItems }, _, _context) => {
  const orderItems = _orderItems.map(async ({ product, quantity }) => {
    const _product_ = await Products.getProduct(product)
    return { product: _product_, quantity }
  })

  return orderItems;
}

export const RetalaOrder = {
  orderItems,
  seller,
  user,
  customer,
  branch
}