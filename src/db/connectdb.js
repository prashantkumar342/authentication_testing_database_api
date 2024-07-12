/* eslint-disable no-undef */
import mongoose from 'mongoose'

const connectDB = () => {
  try {
    mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
    console.log('🛜 database connected succefuly')
  } catch (error) {
    resizeBy.send('Error: ', error)
  }
}

export default connectDB