import express from 'express'
import jwt from 'jsonwebtoken'
import { User as userModel } from '../models/user.model.js'
const tokenVerify = express()

tokenVerify.get('/tokenVerify', async (req, res) => {
  const cookieToken = req.cookies.authToken
  if (!cookieToken) {
    return res.status(404).send('user not logged in ');
  } else {
    jwt.verify(cookieToken, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(403).send('Invalid session');
      } else {
        const { email } = decoded
        try {
          const user = await userModel.findOne({ email })
          if (user) {
            res.status(200).send('logged in')
          } else {
            res.status(404).send('user not found')
          }
        } catch (error) {
          res.status(500).send('Internal server error');
        }
      }
    })
  }

})
export default tokenVerify 