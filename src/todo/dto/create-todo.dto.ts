import { TodoStatus } from '../constants/todo.constants';

export class CreateTodoDto {
  title: string;
  description: string;
  status: TodoStatus;
}
