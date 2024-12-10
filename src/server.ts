import express, { Application, Request, Response } from 'express'
import { todoRouter } from '@routes/todoRoutes'

const app: Application = express()

app.use(express.json())

export enum TodoStatus {
    done = 'DONE',
    process = 'PROCESS',
    todo = 'TODO',
}

export interface ITodo {
    title: string
    description: string
    status: TodoStatus
    id?: number
}

export const todos: ITodo[] = []

// interface MyRequest extends Request {
//     body: ITodo
// }
// app.post('/todo', (req: Request, res: Response) => {
//     console.log(req.body)

//     const id = todos.length + 1
//     const todo: ITodo = { ...req.body, id }
//     todos.push(todo)
//     res.send(todo)
// })

// app.get('/todo', (req: Request, res: Response) => {
//     res.send(todos)
// })

app.use('/todo', todoRouter)

app.listen(9999, () => {
    console.log(9999)
})
