import express, { Application, Request, Response } from 'express'

const app: Application = express()

app.use('/', (req: Request, res: Response) => {
    res.send({
        ok: true,
    })
})

app.listen(9999)
