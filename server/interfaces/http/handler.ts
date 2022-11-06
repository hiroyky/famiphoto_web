import express from 'express'
import { checkSchema } from 'express-validator'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { newOauthClientUsecase } from '../../di/registry'
import expressValidation from './middlewares/express-validation'
import { updateAccessToken } from './middlewares/session-middleware'

const router = express.Router()

router.get(
  '/auth/redirect',
  express.urlencoded({ extended: true }),
  checkSchema({
    state: { in: ['query'] },
    code: { in: ['query'] },
  }),
  expressValidation,
  async (req: express.Request, res: express.Response) => {
    const { code, state } = req.query

    const usecase = newOauthClientUsecase()

    const {
      accessToken,
      refreshToken,
      expireAt,
    } = await usecase.authorizationCode(code as string, new Date())
    req.session.access_token = accessToken
    req.session.access_token_expires = expireAt
    req.session.refresh_token = refreshToken
    res.redirect('/')
  },
)

router.use('/api/*',
  updateAccessToken,
  createProxyMiddleware({
    target: process.env.API_BASE_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
    onProxyReq: (proxyReq, req, res) => {
      if (req.session && req.session.access_token) {
        proxyReq.setHeader('Authorization', `Bearer ${req.session.access_token}`)
      }
    },
  }),
)

if (process.env.IS_DEBUG) {
  router.use('/graphql', updateAccessToken, createProxyMiddleware({
    target: process.env.API_BASE_URL,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      if (req.session && req.session.access_token) {
        proxyReq.setHeader('Authorization', `Bearer ${req.session.access_token}`)
      }
    },
  }))
}

export default router
