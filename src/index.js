/* eslint-disable no-undef */
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import connectDB from './db/connectdb.js'
import HomeRoute from './routes/Home.route.js'
import signupRoute from './routes/Signup.route.js'
import { User as userModel } from './models/user.model.js'
// import fetchUser from './routes/FetchUser.route.js'

connectDB()
dotenv.config({ path: '../.env' })
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(('/', HomeRoute))
app.use(('/api/user/register', signupRoute))
app.get('/api/users', async (req, res) => {
  const users = await userModel.find()
  res.send(users)
})

app.listen(process.env.PORT, () => {
  console.log(`👍 Server Started at http://localhost:${process.env.PORT}/`)
})