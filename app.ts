import { ApolloServer, gql } from "apollo-server";
import * as utils from 'util';
import * as mongoose from 'mongoose';
import * as fs from 'fs';
require('dotenv').config()
// * Importing Resolvers
import { UserMutationResolver, UserQueryResolver } from "./resolvers/auth/auth.resolver";
import { MerchantMutations, MerchantQueries, Merchant } from './resolvers/merchant/merchant.resolver';
import { SellerMutations, SellerQueries, Seller } from './resolvers/seller/seller.resolver';
import { BranchMutations, BranchQueries, Branch } from './resolvers/branch/branch.resolver';
import { PlanMutations, PlanQueries } from './resolvers/plan/plan';
import { PaymentMutations, PaymentQueries, Payment } from './resolvers/payment/payment';
import { CustomerMutations, CustomerQueries, Customer } from './resolvers/customer/customer.resolver';
import { ProductMutations, ProductQueries, Product } from './resolvers/products/products.resolver';
import { QuantityMutations, QuantityQueries, Quantity } from './resolvers/quantity/quantity';
import { RestockMutations, Restock } from './resolvers/restock/restock';
import { OrderMutations, OrderQueries, RetalaOrder } from './resolvers/order/order';

const readFileAsync = utils.promisify(fs.readFileSync)

// * Importing Schema
const schema = fs.readFileSync(`${__dirname}/schema.gql`, 'utf-8');
// TODO: use callback or promised based method later
const typeDefs = gql`${schema}`;

const resolvers = {
  Seller,
  Merchant,
  Branch,
  Product,
  Quantity,
  RetalaOrder,
  Customer,
  Restock,
  Payment, 
  Query: {
    ...UserQueryResolver,
    ...MerchantQueries,
    ...SellerQueries,
    ...BranchQueries,
    ...PlanQueries,
    ...PaymentQueries,
    ...CustomerQueries,
    ...ProductQueries,
    ...QuantityQueries,
    ...OrderQueries
  },
  Mutation: {
    ...UserMutationResolver,
    ...MerchantMutations,
    ...SellerMutations,
    ...BranchMutations,
    ...PlanMutations,
    ...PaymentMutations,
    ...CustomerMutations,
    ...ProductMutations,
    ...QuantityMutations,
    ...OrderMutations,
    ...RestockMutations
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res })
})

// some shits don't just want to work
//@ts-ignore
mongoose.connect(`${process.env.DB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((_result: any) => server.listen(process.env.PORT).then(({ url }) => {
    console.log(url)
    // console.log(_result)
  }))
  .catch(err => console.log(err))

