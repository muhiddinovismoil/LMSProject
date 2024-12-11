import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

const todos: Todo[] = [];

@Injectable()
export class TodoService {
  create(createTodoDto: CreateTodoDto) {
    const id: number = todos.length + 1;
    const newTodo: Todo = { ...createTodoDto, id };
    todos.push(newTodo);
    return newTodo;
  }

  findAll() {
    return todos;
  }

  findOne(id: number) {
    return todos.filter((todo: Todo) => todo.id === id);
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const currentTodo: Todo[] = todos.filter((todo: Todo) => todo.id === id);

    const newTodo: Todo = {
      ...currentTodo[0],
      ...updateTodoDto,
    };

    return newTodo;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
