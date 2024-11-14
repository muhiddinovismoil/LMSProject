import express from 'express'
import morgan from 'morgan'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// ERROR HANDLE
// app.use()

app.get('/', (req, res) => {
    res.send('ok')
})

export default app
