import {
  CreateRetalaPaymentParams,
  RetalaServerContext,
  RetalaPaymentId,
  RetalaUserId,
  RetalaMerchantId
} from '../../interfaces/helper';
import { IPayment } from '../../interfaces/payment';
import { Merchants } from '../../data/models/merchant.model'
import { Payments } from '../../data/models/payment.model'
import { GraphQLFieldResolver } from 'graphql';
import { verifyAuthJWT } from '../../utils/helper';
import { UserInputError } from 'apollo-server';
import { IMerchant } from '../../interfaces/merchant';

let getPayment: GraphQLFieldResolver<IPayment, RetalaServerContext, RetalaPaymentId>;
getPayment = async (_parent, { id }, { req, res }) => {
  try {
    const { usertoken } = req.headers
    if (!usertoken) {
      throw Error("User token not provided");
    }
    let _res = verifyAuthJWT(usertoken.toString())
    if (!_res) {
      throw Error("You are not authenticated")
    }
    const payment = await Payments.getPayment(id);
    if (payment) return payment
  } catch (error) {
    console.log(error)
    // return new UserInputError(error.message)
  }
}

let getPayments: GraphQLFieldResolver<IPayment, RetalaServerContext>;
getPayments = async (_parent, _args, { req, res }) => {
  try {
    const { usertoken } = req.headers
    if (!usertoken) {
      throw Error("User token not provided");
    }
    let _res = verifyAuthJWT(usertoken.toString())
    if (!_res) {
      throw Error("You are not authenticated")
    }
    const payments = await Payments.find({});
    return payments;
  } catch (error) {
    console.log(error)
    // return new UserInputError(error.message)
  }
}

let getMerchantPayments: GraphQLFieldResolver<IPayment, RetalaServerContext, RetalaMerchantId>;
getMerchantPayments = async (_parent, { id }, { req, res }) => {
  try {
    const { usertoken } = req.headers
    if (!usertoken) {
      throw Error("User token not provided");
    }
    let _res = verifyAuthJWT(usertoken.toString())
    if (!_res) {
      throw Error("You are not authenticated")
    }
    const payments = await Payments.find({
      merchant: id
    })
    return payments;
  } catch (error) {
    console.log(error)
    // return new UserInputError(error.message)
  }
}

export const PaymentQueries = {
  getPayments,
  getPayment,
  getMerchantPayments
}

let createPayment: GraphQLFieldResolver<IPayment, RetalaServerContext, CreateRetalaPaymentParams>;
createPayment = async (_parent, { params }, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  const payment = await Payments.createPayment(params);
  return payment;
}

let startTrial: GraphQLFieldResolver<IPayment, RetalaServerContext, RetalaMerchantId>;
startTrial = async (_parnt, { id }, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  const trialResult = await Payments.startTrial(id)
  console.log(trialResult)
  return trialResult;
}

export const PaymentMutations = {
  createPayment,
  startTrial
}

let merchant: GraphQLFieldResolver<IPayment, RetalaServerContext>;
merchant = async (parent, _, _context) => {
  const merchant = await Merchants.findById(parent.merchant);
  return merchant;
} 
export const Payment = {
  merchant,
}