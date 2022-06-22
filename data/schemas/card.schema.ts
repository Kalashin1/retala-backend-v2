import { Schema } from "mongoose";
import { ICardSetting } from "../../interfaces/card";

export const MerchantCardSetting:Schema<ICardSetting> = new Schema({
  authorization_code: String,
  card_type: String,
  last4: String,
  exp_month: String,
  exp_year: String,
  bin: String,
  bank: String,
  channel: String,
  signature: String,
  reusable: Boolean,
  country_code: String
})