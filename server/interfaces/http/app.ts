import express from 'express'
import session from 'cookie-session'
import handler from './handler'

const app = express()
app.use(session({
  secret: process.env.SESSION_SECRET!,
  name: 'famiphoto_session',
  path: '/',
  httpOnly: true,
  maxAge: 1000 * 3600 * 24 * 90,
  secure: false,
  sameSite: 'lax',
}))

app.use(handler)

export default app
