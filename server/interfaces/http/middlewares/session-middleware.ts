import express from 'express'
import { newAuthUseCase } from '../../../di/registry'

export async function updateAccessToken (req: express.Request, _: express.Response, next: express.NextFunction) {
  if (!req.session || !req.session.access_token || !req.session.access_token_expires || !req.session.refresh_token) {
    return next()
  }

  const now = new Date()
  const usecase = newAuthUseCase()
  if (!usecase.isExpired(req.session.access_token_expires, now)) {
    return next()
  }

  const {
    accessToken,
    expireAt,
  } = await usecase.refreshToken(req.session.refresh_token, now)

  const sess = req.session
  sess.access_token = accessToken
  sess.access_token_expires = expireAt
  next()
}
