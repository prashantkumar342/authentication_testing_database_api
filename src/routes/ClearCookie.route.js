import express from 'express'

const clearCookieRoute = express()

clearCookieRoute.get('/clear/cookie', (req, res) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None',
  });
  res.send('Cookie has been removed');
})
export default clearCookieRoute 