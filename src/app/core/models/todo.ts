export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type CreateTodoBody = Omit<Todo, 'id'>;
export type ToggleTodoBody = Pick<Todo, 'id' | 'completed'>;
