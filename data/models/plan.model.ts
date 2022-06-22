import { model } from 'mongoose';
import {
  IPlan,
  IPlanModel,
  planId,
  createPlanParams
} from '../../interfaces/plan'
import { SubPlanSchem } from '../schemas/plan.schema';

SubPlanSchem.statics.createPlan = async function (params:createPlanParams) {
  const plan = await this.create(params);
  return plan;
}

SubPlanSchem.statics.getPlan = async function (id:planId) {
  const plan = await this.findById(id);
  if(!plan) return false;
  return plan;
}

SubPlanSchem.statics.getPlans = async function () {
  const plans = await this.find({});
  console.log(plans);
  return plans
}

SubPlanSchem.statics.deletePlan = async function (id:planId) {
  let result: boolean;
  const doc = await this.findByIdAndDelete(id);
  if(!doc){
    result = false;
    return result;
  }
  result = true;
  return result
}

export const SubPlans = model<IPlan, IPlanModel>('plan', SubPlanSchem);