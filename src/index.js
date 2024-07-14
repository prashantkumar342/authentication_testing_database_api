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
app.use(('/clear/cookie', clearCookieRoute))
app.get('/api/users', async (req, res) => {
  const users = await userModel.find()
  res.send(users)
})
app.get('/tokenVerify', async (req, res) => {
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

app.listen(process.env.PORT, () => {
  console.log(`👍 Server Started at http://localhost:${process.env.PORT}/`)
})