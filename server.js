import app from './src/app.js'

const bootstrap = async () => {
    try {
        app.listen(4000, () => {
            console.info(`server running on port: ${4000}`)
        })
    } catch (error) {
        console.error(error)
    }
}
bootstrap()
