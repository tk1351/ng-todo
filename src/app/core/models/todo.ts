export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type TodoBody = Omit<Todo, 'id'>;
