import express from 'express'
const signupRoute = express()
// import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
// import { User as userModel } from '../models/user.model.js'
import { User as userModel } from '../models/user.model.js'




signupRoute.post('/api/user/register', async (req, res, next) => {
  // const payload = { username: req.body.username, email: req.body.email }
  const hashPass = await bcrypt.hash(req.body.password, 14)
  try {
    await userModel.create({
      username: req.body.username,
      email: req.body.email,
      password: hashPass
    })
    res.status(201).send('User saved successfully');
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).send('Duplicate key error');
    } else {
      res.status(400).send('Error saving user');
    }
  }



  // res.status(201).send()
  next()
})

export default signupRoute

