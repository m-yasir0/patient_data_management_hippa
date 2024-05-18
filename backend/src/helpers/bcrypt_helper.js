import crypt from 'bcrypt'
import { SALT_ROUNDS } from '../utilities/app_constants.js'

const getHash = (plain) => {
  return crypt.hash(plain, SALT_ROUNDS)
}

const compareHash = (plain, hashed) => {
  return crypt.compare(plain, hashed)
}
export { getHash, compareHash }
