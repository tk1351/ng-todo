import { Component, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CreateTodoBody } from '../../../core/models/todo';

@Component({
  selector: 'add-todo',
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
  imports: [ReactiveFormsModule],
})
export class AddTodoComponent {
  private readonly userId = 1;
  title = new FormControl('');

  submitEvent = output<CreateTodoBody>();

  onSubmit(event: Event) {
    event.preventDefault();

    if (!this.title.value) return;

    this.submitEvent.emit({
      userId: this.userId,
      title: this.title.value,
      completed: false,
    });
  }

  reset() {
    this.title.reset();
  }
}
