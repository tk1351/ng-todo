import { Component, inject, input } from '@angular/core';
import { Todo } from '../../../core/models/todo';
import { TodoService } from '../../../core/services/todo';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  private todoService = inject(TodoService);
  private notificationService = inject(NotificationService);

  todo = input.required<Todo>();

  toggleTodo() {
    this.todoService
      .toggleTodo({ id: this.todo().id, completed: this.todo().completed })
      .subscribe({
        next: (newTodo) => {
          this.notificationService.show(`${newTodo.title}を更新しました。`, 'success');
        },
        error: (error) => {
          this.notificationService.show('エラーが発生しました。', 'error');
          console.error(error);
        },
      });
  }
}
