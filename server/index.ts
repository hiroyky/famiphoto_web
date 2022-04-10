import http from 'http'
import express from 'express'
import session from 'express-session'
import { validationResult, body, checkSchema } from 'express-validator'
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

app.use('/oauth/authorize', createProxyMiddleware({
  target: process.env.API_BASE_URL,
  changeOrigin: true,
}))

app.post(
  '/api/auth/redirect',
  express.json(),
  express.urlencoded({ extended: true }),
  checkSchema({
    state: {
      in: ['body'],
    },
    code: {
      in: ['body'],
    },
  }),
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    }
    next()
  },
  async (req: express.Request, res: express.Response) => {
    const code = req.body.code as string

    const usecase = newOauthClientUsecase()

    const {
      accessToken,
      refreshToken,
      expireAt,
    } = await usecase.authorizationCode(code, new Date())

    req.session.access_token = accessToken
    req.session.access_token_expires = expireAt
    req.session.refresh_token = refreshToken
    req.session.save()
    res.json({ login: 'ok' })
  },
)

app.use('/api',
  async (req, res, next) => {
    if (!req.session || !req.session.access_token || !req.session.access_token_expires || !req.session.refresh_token) {
      return next()
    }
    const now = new Date()
    const usecase = newOauthClientUsecase()
    if (usecase.isExpired(req.session.access_token_expires, now)) {
      return next()
    }

    const {
      accessToken,
      expireAt,
    } = await usecase.refreshToken(req.session.refresh_token, now)

    req.session.access_token = accessToken
    req.session.access_token_expires = expireAt
    req.session.save()
    next()
  },
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
  }),
)

export default {
  path: '/',
  handler: app,
}
