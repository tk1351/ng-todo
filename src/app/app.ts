import { Component } from '@angular/core';
import { TodoListComponent } from './features/components/todo-list/todo-list.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [TodoListComponent],
})
export class App {}
