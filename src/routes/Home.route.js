import express from 'express'
const HomeRoute = express.Router()

HomeRoute.get('/', (req, res) => {
  res.send({ "greet": 'hello MR.' })
})



export default HomeRoute