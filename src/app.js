import express from 'express'
import morgan from 'morgan'
import { createUserTable } from './schema/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// ERROR HANDLE
// app.use()

// set up

app.get('/api/v1/setup', async (req, res) => {
    await createUserTable()

    res.send('Table created!.')
})

console.log('a')

export default app
