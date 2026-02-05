import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { TodoService } from '../../../core/services/todo';
import { map } from 'rxjs';
import { Todo, TodoBody } from '../../../core/models/todo';
import { PaginationComponent } from '../../../shared/ui/components/pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { SkeletonComponent } from '../../../shared/ui/components/skeleton/skeleton.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';

@Component({
  imports: [PaginationComponent, TodoItemComponent, AddTodoComponent, SkeletonComponent],
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  private readonly limit = 10;
  readonly skeltonItems = Array.from({ length: this.limit });

  todos = signal<Todo[]>([]);
  loading = signal(false);

  private todoService = inject(TodoService);
  private activatedRoute = inject(ActivatedRoute);

  addTodoComponent = viewChild(AddTodoComponent)

  currentPage = toSignal(
    this.activatedRoute.queryParams.pipe(map((params) => Number(params['page']) || 1)),
    { initialValue: 1 },
  );

  constructor() {
    this.todoService.setup();

    effect(() => {
      const start = (this.currentPage() - 1) * this.limit;
      this.loading.set(true);
      this.todoService.getTodos(start, this.limit).subscribe({
        next: (todos) => {
          this.todos.set(todos);
        },
        complete: () => this.loading.set(false),
      });
    });
  }

  addTodo(body: TodoBody) {
    this.todoService.createTodo(body).subscribe({
      next: (newTodo) => {
        console.log('create', newTodo)
        this.addTodoComponent()?.reset();
      },
      error: (error) => {
        console.error(error)
      }
    });
  }
}
