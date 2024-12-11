import { TodoStatus } from '../constants/todo.constants';

export class Todo {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
}
