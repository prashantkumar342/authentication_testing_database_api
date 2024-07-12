import express from 'express'
const signupRoute = express()
// import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User as userModel } from '../models/user.model.js'




signupRoute.post('/api/user/register', async (req, res, next) => {
  // const payload = { username: req.body.username, email: req.body.email }
  const hashPass = await bcrypt.hash(req.body.password, 14)
  try {
    // userModel.createIndexe({ username: 1, email: 1, phone: 1 }, { unique: true })
    userModel.init()
    const userCred = new userModel({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: hashPass
    })
    await userCred.save()
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
