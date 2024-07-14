/* eslint-disable no-undef */
import express from 'express'
import { User as userModel } from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const loginRoute = express()

loginRoute.post('/api/user/login', async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email })
  const privateKey = process.env.JWT_SECRET_KEY
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const authToken = jwt.sign({ email: req.body.email }, privateKey)
  res.cookie('authToken', authToken, {
    httpOnly: true,
    secure: false,
    // sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000
  });

  res.status(200).json({ message: 'Logged in successfully' });
})

export default loginRoute