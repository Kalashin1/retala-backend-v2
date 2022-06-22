import { Document, Model } from "mongoose";

export interface ICardSetting extends Document {
  authorization_code: string
  card_type: string
  last4: string
  exp_month: string
  exp_year: string
  bin: string
  bank: string
  channel: string
  signature: string
  reusable: boolean
  country_code: string
}