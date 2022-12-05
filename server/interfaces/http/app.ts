import express from 'express'
import session from 'cookie-session'
import { SessionCookieName } from '../../config'
import handler from './handler'

const app = express()
app.use(session({
  secret: process.env.SESSION_SECRET!,
  name: SessionCookieName,
  path: '/',
  httpOnly: true,
  maxAge: 1000 * 3600 * 24 * 90,
  secure: false,
  sameSite: 'lax',
}))

app.use(handler)

export default app
