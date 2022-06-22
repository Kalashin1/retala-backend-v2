import {
  Customers
} from '../../data/models/customer.model'
import { verifyAuthJWT } from '../../utils/helper';
import {
  ICustomer
} from '../../interfaces/customer'
import { GraphQLFieldResolver } from 'graphql';
import {
  UserInputError
} from 'apollo-server'
import {
  CreateRetalaCustomerParams,
  RetalaServerContext,
  RetalaCustomerId,
  RetalaMerchantId,
  RetalaCustomerSearchParams,
  EditRetalaCustomerParams
} from '../../interfaces/helper'
import { Orders } from '../../data/models/order.model';


let getCustomers: GraphQLFieldResolver<ICustomer, RetalaServerContext>;

getCustomers = async (parent, args, { req, res }) => {
  try {
    const { usertoken } = req.headers
    if (!usertoken) {
      throw Error("User token not provided");
    }
    let _res = verifyAuthJWT(usertoken.toString())
    if (!_res) {
      throw Error("You are not authenticated")
    }
    return await Customers.getCustomers()
  } catch (error) {
    return new UserInputError(error.message)
  }
}

let getCustomer: GraphQLFieldResolver<ICustomer, RetalaServerContext, RetalaCustomerId>;
getCustomer = async (parent, args, { req, res }) => {
  try {
    const { usertoken } = req.headers
    if (!usertoken) {
      throw Error("User token not provided");
    }
    let _res = verifyAuthJWT(usertoken.toString())
    if (!_res) {
      throw Error("You are not authenticated")
    }
    const customer = await Customers.getCustomer(args.id);
    if (!customer) {
      return new UserInputError("No user exists with that Id");
    }
    return customer
  } catch (error) {
    return new UserInputError(error.message);
  }
}


let getMerchantCustomers: GraphQLFieldResolver<ICustomer, RetalaServerContext, RetalaMerchantId>;
getMerchantCustomers = async (parent, args, { req, res }) => {
  try {
    const { usertoken } = req.headers
    if (!usertoken) {
      throw Error("User token not provided");
    }
    let _res = verifyAuthJWT(usertoken.toString())
    if (!_res) {
      throw Error("You are not authenticated")
    }
    const customers = await Customers.findMerchantsCustomers(args.id)
    if (!customers) {
      return new UserInputError('This merchant has no customers');
    }
    // console.log(customers)
    return customers;
  } catch (error) {
    return new UserInputError(error.message);
  }
}

let searchCustomers: GraphQLFieldResolver<ICustomer, RetalaServerContext, RetalaCustomerSearchParams>;
searchCustomers = async (parent, args, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  const customers = await Customers.searchCustomers(args.id, args.customerName)
  return customers;
}


let deleteCustomer: GraphQLFieldResolver<ICustomer, RetalaServerContext, RetalaCustomerId>;
deleteCustomer = async (parent, args, { req, res }) => {
  try {
    const { usertoken } = req.headers
    if (!usertoken) {
      throw Error("User token not provided");
    }
    let _res = verifyAuthJWT(usertoken.toString())
    if (!_res) {
      throw Error("You are not authenticated")
    }
    const customer = await Customers.deleteCustomer(args.id);
    return customer;
  } catch (error) {
    return new UserInputError(error.message)
  }
}

export const CustomerQueries = {

  getCustomer,
  getCustomers,
  getMerchantCustomers,
  deleteCustomer,
  searchCustomers

}

let createCustomer: GraphQLFieldResolver<ICustomer, RetalaServerContext, CreateRetalaCustomerParams>;
createCustomer = async (parent, args, { req, res }) => {
  try {
    const { usertoken } = req.headers
    if (!usertoken) {
      throw Error("User token not provided");
    }
    let _res = verifyAuthJWT(usertoken.toString())
    if (!_res) {
      throw Error("You are not authenticated")
    }
    const customer = await Customers.createCustomer(args.params);
    return customer;
  } catch (error) {
    return new UserInputError(error.message)
  }
}


let editCustomer: GraphQLFieldResolver<ICustomer, RetalaServerContext, EditRetalaCustomerParams>;
editCustomer = async (parent, args, { req, res }) => {
  try {
    const { usertoken } = req.headers
    if (!usertoken) {
      throw Error("User token not provided");
    }
    let _res = verifyAuthJWT(usertoken.toString())
    if (!_res) {
      throw Error("You are not authenticated")
    }
    const result = await Customers.editCustomer(args.id, args.name, args.phone)
    return result
  } catch (error) {
    return new UserInputError(error.message)
  }
}



export const CustomerMutations = {
  createCustomer,
  editCustomer
}


let transactions: GraphQLFieldResolver<ICustomer, RetalaServerContext>
transactions = async (parent, _, _context) => {
  const transactions = await Orders.find({ customer: parent._id })
  return transactions;
}

export const Customer = {
  transactions
}