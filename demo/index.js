const {
    Worker,
    isMainThread,
    workerData,
    parentPort,
} = require('worker_threads')

if (isMainThread) {
    function runService(workerData) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, { workerData })
            worker.on('message', resolve)
            worker.on('error', reject)
            worker.on('exit', (code) => {
                if (code !== 0)
                    reject(new Error(`Worker stopped with exit code ${code}`))
            })
        })
    }

    async function run() {
        const result = await runService('world')
        console.log(result)
    }

    run().catch((err) => console.error(err))
} else {
    // You can do any heavy stuff here, in a synchronous way
    // without blocking the "main thread"
    parentPort.postMessage({ hello: workerData })
}
