import express from 'express'
import { checkSchema } from 'express-validator'
import { newOauthClientUsecase } from '../../di/registry'
import expressValidation from './middlewares/express-validation'

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

export default router
newOauthClientUsecase
