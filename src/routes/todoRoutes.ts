import { Router } from 'express'
import { TodoController } from '../controllers/todoControllers'

const todoController = new TodoController()

export const todoRouter: Router = Router()

todoRouter.post('/', todoController.create)
todoRouter.get('/', todoController.find)
