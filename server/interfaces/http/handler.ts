import express from 'express'
import { checkSchema } from 'express-validator'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { newAuthUseCase } from '../../di/registry'
import { ApiError } from '../../drivers/api-driver'
import expressValidation from './middlewares/express-validation'
import { updateAccessToken } from './middlewares/session-middleware'

const router = express.Router()

router.post(
  '/auth/login',
  express.urlencoded({ extended: true }),
  express.json(),
  checkSchema({
    userId: { in: ['body'] },
    password: { in: ['body'] },
  }),
  expressValidation,
  async (req: express.Request, res: express.Response) => {
    const { userId, password } = req.body

    const useCase = newAuthUseCase()
    try {
      const {
        accessToken,
        refreshToken,
        expireAt,
      } = await useCase.login(userId, password, new Date())
      req.session.access_token = accessToken
      req.session.access_token_expires = expireAt
      req.session.refresh_token = refreshToken
      res.sendStatus(200)
    } catch (err) {
      errorResponse(res, err)
    }
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

function errorResponse (res: express.Response, err: any) {
  if (err instanceof ApiError) {
    res.status(err.httpStatus)
    res.send(JSON.stringify(err))
    return
  }

  res.status(500)
  res.send(JSON.stringify({ error: 'Internal server error' }))
}

export default router
