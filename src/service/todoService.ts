import { ITodo, todos } from '../server'

export class TodoService {
    create(todo: ITodo): ITodo {
        const id = todos.length + 1
        const currentTodo: ITodo = { ...todo, id }
        todos.push(todo)
        return currentTodo
    }
    update() {}
    find(): ITodo[] {
        return todos
    }
    findOne() {}

    delete() {}
}
