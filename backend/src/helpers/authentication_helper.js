import jwt from 'jsonwebtoken'

export default (authUser) => {
  return jwt.sign(JSON.stringify(authUser), process.env.TOKEN_KEY)
}
