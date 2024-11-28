import cluster from 'cluster'
import { cpus } from 'os'
import express from 'express'

const numCPUs = cpus().length
console.log(numCPUs)

if (cluster.isPrimary) {
    console.log(`Master process ${process.pid} is running`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker process ${worker.process.pid} died. Restarting...`)
        cluster.fork()
    })
} else {
    const app = express()

    app.use((req, res) => {
        res.send('ok')
    })
    const server = app.listen(3000, () => {
        console.log(`Worker process ${process.pid} is listening on port 3000`)
    })
}

/*
npx loadtest -c 10 --rps 100 -n 100 http://localhost:3000
*/
