import { ObjectId } from 'mongodb';
import { Document, Model } from 'mongoose';

export interface IPlan extends Document {
  title: string,
  _id: ObjectId
  monthly: number,
  annual: number,
  access: []
}

export type createPlanParams = {
  title: string,
  monthly: number,
  annual: number,
  access: []
}

export type planId = ObjectId | string

export interface IPlanModel extends Model<IPlan>{
  createPlan: (params: createPlanParams) => Promise<IPlan>
  editPlan: (id: planId, params: createPlanParams) => Promise<IPlan>
  getPlans: ()=> Promise<IPlan[]>
  getPlan: (id: planId) => Promise<IPlan>
  deletePlan: (id: planId) => Promise<boolean>
}