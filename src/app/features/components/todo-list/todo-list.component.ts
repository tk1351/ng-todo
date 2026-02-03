import { Component, inject } from '@angular/core';
import { TodoService } from '../../../core/services/todo';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  constructor() {
    this.todoService.setup();
    this.todoService.todos();
  }

  todoService = inject(TodoService);
}
