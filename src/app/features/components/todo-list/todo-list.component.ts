import { Component, effect, inject } from '@angular/core';
import { TodoService } from '../../../core/services/todo';
import { map, Observable } from 'rxjs';
import { Todo } from '../../../core/models/todo';
import { AsyncPipe } from '@angular/common';
import { PaginationComponent } from '../../../shared/ui/components/pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [AsyncPipe, PaginationComponent],
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  todos$!: Observable<Todo[]>;

  private todoService = inject(TodoService);
  private activatedRoute = inject(ActivatedRoute);

  currentPage = toSignal(
    this.activatedRoute.queryParams.pipe(map((params) => Number(params['page']) || 1)),
    { initialValue: 1 },
  );

  constructor() {
    effect(() => {
      this.todoService.setup();
      this.todos$ = this.todoService.getTodos();
    });
  }
}
