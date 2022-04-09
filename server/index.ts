import http from 'http'
import express from 'express'
import session from 'express-session'
import { validationResult, body } from 'express-validator'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { newOauthClientUsecase } from './di/registry'

const app = express()
app.use(session({
  secret: process.env.SESSION_SECRET!,
  name: 'famiphoto_session',
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 1000 * 3600 * 24 * 90,
    sameSite: 'strict',
  },
}))

app.post(
  '/api/auth/redirect',
  body('state').isString(),
  body('code').isString(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    }
    next()
  },
  async (req: express.Request, res: express.Response) => {
    const code = req.query.code as string

    const usecase = newOauthClientUsecase()

    const {
      accessToken,
      refreshToken,
      expireIn,
    } = await usecase.authorizationCode(code)
    req.session.access_token = accessToken
    req.session.access_token_expires = expireIn
    req.session.refresh_token = refreshToken

    res.json({ login: 'ok' })
  },
)

app.use('/api',
  createProxyMiddleware({
    target: process.env.API_BASE_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/',
    },
    onProxyReq: (proxyReq, req, res) => {
      if (req.session && req.session.access_token) {
        proxyReq.setHeader('Authorization', `Bearer ${req.session.access_token}`)
      }
    },
  })
)

export default {
  path: '/',
  handler: app,
}
