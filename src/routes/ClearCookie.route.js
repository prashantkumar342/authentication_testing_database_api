import express from 'express'

const clearCookieRoute = express()

clearCookieRoute.get('/clear/cookie', (req, res) => {
  res.clearCookie('authToken');
  res.send('Cookie has been removed');
})
export default clearCookieRoute 