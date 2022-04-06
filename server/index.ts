import express from 'express'

const app = express()

app.get('/graphql', (req, res) => {
    console.log('hoge')
    res.json({"ok": "ok"})
})

app.post('/graphql-cc', (req, res) => {
    console.log('hoge')
})

export default {
    path: '/api-cc',
    handler: app,
}