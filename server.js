import express from 'express'
import DeviceDetector from 'node-device-detector'

const PORT = process.env.PORT
const detector = new DeviceDetector()

const app = express()

app.use((request, response) => {
    const ip = request.ip
    const ips = request.ips
    const host = request.host
    const hostname = request.hostname
    const xhr = request.xhr

    const userAgent = request.headers['user-agent']
    const result = detector.detect(userAgent)

    // eslint-disable-next-line no-console
    console.log({ ...result, ip, ips, host, hostname, xhr })
    response.send({ ...result, ip, ips, host, hostname, xhr })
})

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Application running on port ' + PORT)
})
