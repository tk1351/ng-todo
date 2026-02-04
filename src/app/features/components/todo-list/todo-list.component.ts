import { Component, effect, inject, signal } from '@angular/core';
import { TodoService } from '../../../core/services/todo';
import { map } from 'rxjs';
import { Todo } from '../../../core/models/todo';
import { PaginationComponent } from '../../../shared/ui/components/pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  imports: [PaginationComponent, TodoItemComponent],
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  private readonly limit = 10;

  todos = signal<Todo[]>([]);
  loading = signal(false);

  private todoService = inject(TodoService);
  private activatedRoute = inject(ActivatedRoute);

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
}
