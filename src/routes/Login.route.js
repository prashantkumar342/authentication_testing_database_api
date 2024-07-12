/* eslint-disable no-undef */
import express from 'express'
import { User as userModel } from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const loginRoute = express()

loginRoute.post('/api/user/login', async (req, res) => {
  const user = await userModel.findOne({
    $or: [
      { email: req.body.email },
      { username: req.body.username }
    ]
  })
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const privateKey = process.env.JWT_SECRET_KEY
    const payload = { username: user.username, email: user.email }
    const authToken = jwt.sign(payload, privateKey, { algorithm: 'RS256' }, { expiresIn: '7d' })
    res.status(200).cookie('authToken', authToken, {
      httpOnly: true,
      sameSite: 'strict'
    })
  } else {
    res.status(401).send({ erro: 'somenthing went wrong' })
  }
})

export default loginRoute