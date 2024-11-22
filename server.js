import app from './src/app.js'

const bootstrap = async () => {
    try {
        app.listen(3000, () => {
            console.info(`server running on port: ${3000}`)
        })
    } catch (error) {
        console.error(error)
    }
}
bootstrap()
