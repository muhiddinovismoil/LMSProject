import { Request, Response } from 'express'
import { ITodo, todos } from '../server'
import { TodoService } from '../service/todoService'
const todoService = new TodoService()

export class TodoController {
    create(req: Request, res: Response) {
        const todo = todoService.create(req.body)
        res.send(todo)
    }
    update(req: Request, res: Response) {}
    find(req: Request, res: Response) {
        res.send(todos)
    }
    findOne(req: Request, res: Response) {}
    delete(req: Request, res: Response) {}
}
