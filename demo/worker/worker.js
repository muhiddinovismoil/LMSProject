import { parentPort, workerData } from 'worker_threads'

function intensiveTask(data) {
    let count = 0
    for (let i = 0; i < 1e9; i++) {
        count += i
    }
    return `${data} - Task Complete with count ${count}`
}

const result = intensiveTask(workerData)
parentPort.postMessage(result)
