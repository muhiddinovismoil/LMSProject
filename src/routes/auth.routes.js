import { Router } from 'express'
import { authController } from '../controllers/index.js'

export const authRoutes = Router()

authRoutes.post('/register', authController.register)
authRoutes.post('/login', authController.login)
