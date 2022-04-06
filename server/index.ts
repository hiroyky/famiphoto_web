import express from 'express'
import { validationResult, body } from 'express-validator'
import { newOauthClientUsecase } from './di/registry'

const app = express()

app.post('/oauth', (req, res) => {

})

app.post(
    '/auth/redirect', 
    body('state').isString(),
    body('code').isString(),
    async (req: express.Request, res: express.Response) => {

    const errors= validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    const code = req.query.code as string

    const usecase = newOauthClientUsecase()
    const { 
        accessToken, 
        refreshToken, 
        expireIn,
     } = await usecase.authorizationCode(code)

    res.json(req.query)
})

export default {
    path: '/api',
    handler: app,
}