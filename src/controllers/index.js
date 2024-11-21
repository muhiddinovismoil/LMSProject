import { Service } from '../services/index.js'
const todoController = {
    getAll: async (request, response, next) => {
        try {
            const todos = await Service.findAll()
            return response.send(todos)
        } catch (error) {
            next(error)
        }
    },

    getOne: async (request, response, next) => {
        try {
            const { id } = request.params
            const todo = await Service.findOne(id)
            return response.send(todo)
        } catch (error) {
            next(error)
        }
    },

    create: async (request, response, next) => {
        try {
            const todo = request.body
            const currentTodo = await Service.create(todo)
            return response.send(currentTodo)
        } catch (error) {
            next(error)
        }
    },

    update: async (request, response, next) => {
        try {
            const todo = request.body
            const { id } = request.params
            const currentTodo = await Service.update(id, todo)
            console.log({ currentTodo })
            return response.send(currentTodo)
        } catch (error) {
            next(error)
        }
    },

    delete: async (request, response, next) => {
        try {
            const { id } = request.params
            const currentTodo = await Service.delete(id)
            return response.send({ currentTodo })
        } catch (error) {
            next(error)
        }
    },
}

export default todoController
