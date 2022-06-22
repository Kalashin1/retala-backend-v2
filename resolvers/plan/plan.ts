import {
  SubPlans
} from '../../data/models/plan.model'
import {
  GraphQLFieldResolver,
} from 'graphql'
import {
  IPlan,
} from '../../interfaces/plan';
import { verifyAuthJWT } from '../../utils/helper';
import {
  RetalaServerContext,
  CreateRetalaSubPlan,
  EditRetalaSubPlan,
  RetalaSubPlanId
} from '../../interfaces/helper'

let getPlan: GraphQLFieldResolver<IPlan, RetalaServerContext, RetalaSubPlanId>;
getPlan = async (_parent, { id }, { req, res }) => {
  try {
    const { usertoken } = req.headers
    if (!usertoken) {
      throw Error("User token not provided");
    }
    let _res = verifyAuthJWT(usertoken.toString())
    if (!_res) {
      throw Error("You are not authenticated")
    }
    const plan = await SubPlans.getPlan(id);
    return plan;
  } catch (error) {
    console.log(error)
    // return new UserInputError(error.message)
  }
}

let getPlans: GraphQLFieldResolver<IPlan, RetalaServerContext>;
getPlans = async (_parent, { id }, { req, res }) => {
  try {
    const { usertoken } = req.headers
    if (!usertoken) {
      throw Error("User token not provided");
    }
    let _res = verifyAuthJWT(usertoken.toString())
    if (!_res) {
      throw Error("You are not authenticated")
    }
    const plans = await SubPlans.find({});
    return plans;
  } catch (error) {
    console.log(error)
    // return new UserInputError(error.message)
  }
}

export const PlanQueries = {
  getPlan,
  getPlans
}

let createPlan: GraphQLFieldResolver<IPlan, RetalaServerContext, CreateRetalaSubPlan>;
createPlan = async (_parent, args, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  const plan = await SubPlans.createPlan(args.params);
  return plan;
}

let editPlan: GraphQLFieldResolver<IPlan, RetalaServerContext, EditRetalaSubPlan>;
editPlan = async (_parent, { id, params }, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  const doc = await SubPlans.findById(id);
  if (doc) {
    await doc.updateOne(params)
    return { status: true, data: doc._id };
  }
  return false;
}

let deletePlan: GraphQLFieldResolver<IPlan, RetalaServerContext, RetalaSubPlanId>;
deletePlan = async (_parent, { id }, { req, res }) => {
  const { usertoken } = req.headers
  if (!usertoken) {
    throw Error("User token not provided");
  }
  let _res = verifyAuthJWT(usertoken.toString())
  if (!_res) {
    throw Error("You are not authenticated")
  }
  const result = await SubPlans.deletePlan(id)
  return { status: result };

}

export const PlanMutations = {
  createPlan,
  editPlan,
  deletePlan
}