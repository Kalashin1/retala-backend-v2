import { IPlan } from '../../interfaces/plan';
import { Schema } from 'mongoose';

export const SubPlanSchem = new Schema<IPlan>({
  title: String,
  monthly: Number,
  annual: Number,
  access: []
}, {
  timestamps: true
})