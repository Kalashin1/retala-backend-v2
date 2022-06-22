import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { userId } from '../interfaces/user'
require('dotenv').config()

const saltRounds = 10;

export async function hashPassword(password: string){
  return await bcrypt.hash(password, saltRounds)
}

export async function comparePasswords(passowrd: string, hash: string){
  return await bcrypt.compare(passowrd, hash)
}

export const createAuthJWT = async (id: userId) => {
  return await jwt.sign({ id} , `${process.env.JWT_AUTH_SECRET}`, {
    expiresIn: 60 * 60 * 24 * 7
  });
}

export let verifyAuthJWT = (token: string) => {
  return jwt.verify(token, `${process.env.JWT_AUTH_SECRETE}`)
}