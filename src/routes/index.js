import { Router } from 'express'
import todoController from '../controllers/index.js'

const router = new Router()

// get all todo
router.get('/todos', todoController.getAll)
router.post('/todos', todoController.create)
router.get('/todos/:id', todoController.getOne)
router.put('/todos/:id', todoController.update)
router.delete('/todos/:id', todoController.delete)

export default router
