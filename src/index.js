/* eslint-disable no-undef */
import express from 'express'
const app = express()
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import connectDB from './db/connectdb.js'
import HomeRoute from './routes/Home.route.js'
import signupRoute from './routes/Signup.route.js'
import loginRoute from './routes/Login.route.js'
import tokenVerify from './routes/tokenVerify.route.js'
import jwt from 'jsonwebtoken'
import clearCookieRoute from './routes/ClearCookie.route.js'
import { User as userModel } from './models/user.model.js'
import cookieParser from 'cookie-parser'
// import fetchUser from './routes/FetchUser.route.js'
const corsOptions = {
  origin: process.env.REACT_APP_URL,
  credentials: true, // This is the key part to include credentials
};
app.use(cors(corsOptions));
connectDB()
dotenv.config({ path: '../.env' })

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(('/', HomeRoute))
app.use(('/api/user/register', signupRoute))
app.use(('/api/user/login', loginRoute))
app.use(('/tokenVerify', tokenVerify))
app.use(('/clear/cookie', clearCookieRoute))
app.get('/api/users', async (req, res) => {
  const users = await userModel.find()
  res.send(users)
})
const token = jwt.sign({ hi: 'hisfsdjk' }, 'ssdddddds')
app.get('/create/cookie', (req, res) => {
  res.status(200).cookie('kumar', token, { httpOnly: true }).send('cookiecreated')
})

app.listen(process.env.PORT, () => {
  console.log(`👍 Server Started at http://localhost:${process.env.PORT}/`)
})