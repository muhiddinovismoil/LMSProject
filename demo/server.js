import express from 'express'
// import fs from "fs/promises"
import fs from 'fs'
import path from 'path'
import cluster from 'cluster'
import os from 'os'

const app = express()

if (cluster.isPrimary) {
    const cpuCount = os.cpus().length

    console.log({ cpuCount })
    for (let i = 0; i < cpuCount; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker) => {
        console.log(`id ${worker.process.id}`)
        cluster.fork()
    })
} else {
    app.use('/request', async (request, response) => {
        // const file = await fs.readFile(path.join(import.meta.dirname, "2024-10-30 14-10-53.mkv"))
        const stream = fs.createReadStream(
            path.join(import.meta.dirname, '2024-10-30 14-10-53.mkv'),
        )

        stream.pipe(response)
        // response.send(file)
    })

    app.use('/block', async (request, response) => {
        const arr = new Array(100000000).fill('SALOM DUNYO')

        for (let i = 0; i < arr.length; i++) {
            const element = arr[i]
            arr[i]++
        }

        response.send('ok')
    })

    app.use('/all', async (request, response) => {
        response.send({
            name: 'All',
        })
    })

    app.listen(4000, () => {
        console.log(`Server running on port: ${4000}`)
    })
}
