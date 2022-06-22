import { Users } from '../../data/models/user.model';
import { sendWelcomeMaiL, addToIntercom } from '../../utils';
import axios from 'axios';
import { Branches } from "../../data/models/branch.model"
import { Merchants } from '../../data/models/merchant.model'
import { GraphQLField, GraphQLFieldResolver } from 'graphql';
import { IUser } from '../../interfaces/user';
import { 
  RetalaServerContext,
  createRetalaUser,
  RetalaUserId,
  updateRetalaUser,
  RetalaUserPhone,
  RetalaUserEmail,
  LoginUserParams,
  ResetPasswordParams,
  userJWT
} from '../../interfaces/helper';
import { createMerchantParams } from '../../interfaces/merchant';


/**
 * @function createNewRetalaUser creates a new retala user
 * 
 */
let createNewRetalaUser: GraphQLFieldResolver<IUser, RetalaServerContext, createRetalaUser> 

createNewRetalaUser = async (_: IUser, args: createRetalaUser, context: RetalaServerContext) => {
  // console.log(args.newUserParams)
  const user = await Users.createNewUser(args.newUserParams);
  // TODO: emit event New User created with id
  let createMerchantParams:createMerchantParams;
  createMerchantParams = {
    name: args.newUserParams.businessName,
    owner: user._id,
    referral: user.referral ? user.referral: '',
    state: args.newUserParams.state ? args.newUserParams.state : ''
  }
  const merchant = await Merchants.create(createMerchantParams);
  // TODO: emit event Merchant Created for user
  let createBranchParams = {
    merchant: merchant._id
  }
  const branch = await Branches.create(createBranchParams)
  user.password = '';
  // TODO: send the user a welcome mail
  await sendWelcomeMaiL(user.name, user.email)
  // TODO: add them to intercome
  await addToIntercom(user)
  return user

}
/**
 * @function users returns all retala users
 * 
 */
let users: GraphQLFieldResolver<IUser, RetalaServerContext>
users =  async (_, args, context) => {
  const users = await Users.users()
  users.forEach((user: IUser) => {
    user.password = ''
  });
  return users
}
/**
 * @function user returns a retala users
 */
let user: GraphQLFieldResolver<IUser, RetalaServerContext, RetalaUserId>
user =  async (_, args, context) => {
  const user = await Users.findUserById(args.id);
  user.password = ''
  return user
}

/**
 * @function updateRetalaUser creates a new retala user
 */
let updateRetalaUser:GraphQLFieldResolver<IUser, RetalaServerContext, updateRetalaUser>
updateRetalaUser = async (_, args, context) => {
  const user = await Users.editUser(args.id, args.updateUserParams);
  return user;
}

/**
 * @function delete deletes a retala user
 * 
 */
let deleteRetalaUser: GraphQLFieldResolver<IUser, RetalaServerContext, RetalaUserId>
deleteRetalaUser = async (_, args, context) => {
  const status = await Users.deleteUser(args.id);
  return { status };
}


let findUserByEmail: GraphQLFieldResolver<IUser, RetalaServerContext, RetalaUserEmail>
findUserByEmail =  async (_, args, context) => {
  const user = await Users.findOne({ email: args.email });
  if(user){
    return user
  }
}

let getUser: GraphQLFieldResolver<IUser, RetalaServerContext, userJWT>;
getUser = async (_, { token }, _contex) => {
  const res = await axios({
    url: `https://peaceful-shaw-e0898c.netlify.app/.netlify/functions/getUser`,
    method: "POST",
    headers: { 'Content-Type': 'application/json'},
    data: { token }
  })
  // console.log(res.data)
  const { result: { user } } = res.data;
  return user;
}

let checkUserEmail: GraphQLFieldResolver<IUser, RetalaServerContext, RetalaUserEmail>
checkUserEmail = async (_, { email }, _contex) => {
  const res = await axios.get(`https://peaceful-shaw-e0898c.netlify.app/.netlify/functions/checkEmail?email=${email}`)
  // console.log(res.data)
  const { status, result } = res.data;
  return { status, data: result } // if false email does exists, if true email does not exist
}

let findUserByPhone: GraphQLFieldResolver<IUser, RetalaServerContext, RetalaUserPhone>
findUserByPhone =  async (_, args, _context) => {
  const user = await Users.findUserByPhoneNumber(args.phoneNumber)
  if(user){
    return user
  } 
}

let requestPasswordResetLink: GraphQLFieldResolver<IUser, RetalaServerContext, RetalaUserEmail>;
requestPasswordResetLink = async (_, { email }, _context) => {
  const res = await axios.get(
    `https://peaceful-shaw-e0898c.netlify.app/.netlify/functions/requestPasswordResetLink?email=${email}`
  );
  // console.log(res);
  const { status, token } = res.data
  let code = Math.floor(Math.random() * 999999)
  const user = await Users.findUserByEmail(email);
  let link = `https://peaceful-shaw-e0898c.netlify.app/.netlify/functions/reset?token=${token}`
  if(user){
    await user.updateOne({ code })
    const _res = await axios({
      url: `https://awesome-blackwell-208752.netlify.app/.netlify/functions/reset`,
      headers: {
        "Content-Type": "application/json"
      },
      method: "post",
      data: {
        email,
        name: user.name,
        link
      }
    })
    console.log(_res.data)
  }
  return { status, token, data: link }
}

let resetPassword: GraphQLFieldResolver<IUser, RetalaServerContext, ResetPasswordParams>;
resetPassword = async (_, { password, token, id }, _context) => {
  const res = await axios(
    {
      method: 'POST',
      url: `https://peaceful-shaw-e0898c.netlify.app/.netlify/functions/resetPassword?id=${id}`,
      headers: { 'Content-Type': 'application/json'},
      data: { password, token }
    }
  )
  // console.log(res)
  const { result: { status, id: _id }} = res.data;
  return { status, data: _id}
}

let login: GraphQLFieldResolver<IUser, RetalaServerContext, LoginUserParams>;
login = async (_, args, context) => {
  // console.log(args.password)
  const res = await axios.post('https://peaceful-shaw-e0898c.netlify.app/.netlify/functions/login', args)
  const { user, type, merchant, branch } = res.data;
  console.log(res.data);
  return { user, type, merchant, branch }
}

let verifyEmail: GraphQLFieldResolver<IUser, RetalaServerContext, RetalaUserId>;
verifyEmail = async (_, { id }, _context) => {
  // console.log(id)
  const res = await axios.get(`https://peaceful-shaw-e0898c.netlify.app/.netlify/functions/verifyEmail?id=${id}`);
  // console.log(res.data);
  const { status } = res.data;
  return { status }
}

let verifyPhoneNumber: GraphQLFieldResolver<IUser, RetalaServerContext, RetalaUserId>;
verifyPhoneNumber = async (_, { id }, _context) => {
  const res = await axios.get(`https://peaceful-shaw-e0898c.netlify.app/.netlify/functions/verifyNumber?id=${id}`)
  // console.log(res.data)
  const { status } = res.data;
  return { status }
}

let generateAuthToken: GraphQLFieldResolver<IUser, RetalaServerContext, RetalaUserId>;
generateAuthToken = async (_, { id }, _contex) => {
  const res = await axios.get(`https://peaceful-shaw-e0898c.netlify.app/.netlify/functions/generateAuthToken?id=${id}`);
  // console.log(res.data)
  const { result: { status, token} } = res.data
  return { status, token }
}

export const UserQueryResolver = {
  users,
  user,
  findUserByEmail,
  findUserByPhone,
  getUser,
  checkUserEmail,
  requestPasswordResetLink
}

export const UserMutationResolver = {
  createNewRetalaUser,
  updateRetalaUser,
  deleteRetalaUser,
  login,
  verifyEmail,
  verifyPhoneNumber,
  resetPassword,
  generateAuthToken
}