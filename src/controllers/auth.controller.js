import { logger } from '../utils/logger.js'
import { login, register } from '../services/index.js'

export const authController = {
    register: async function (req, res, next) {
        try {
            const currentUser = await register(req.body)

            res.send(currentUser)
        } catch (error) {
            logger.error(error)
            next(error)
        }
    },
    login: async function (req, res, next) {
        try {
            const currentUser = await login(req.body)

            res.send(currentUser)
        } catch (error) {
            logger.error(error)
            next(error)
        }
    },
}
