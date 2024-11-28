import { Worker } from 'worker_threads'

function runService(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData })
        worker.on('message', resolve)
        worker.on('error', reject)
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`))
        })
    })
}

runService('ASSALOMU ALAYKUM!')
    .then((result) => console.log(result))
    .catch((err) => console.error(err))
