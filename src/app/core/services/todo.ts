import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo, TodoBody } from '../models/todo';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);

  setup() {
    console.log('🚀 TodoService');
  }

  getTodos(start = 0, limit = 10): Observable<Todo[]> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
    });
    return this.http.get<Todo[]>(
      `https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=${limit}`,
      { headers },
    );
  }

  createTodo(body: TodoBody): Observable<Todo> {
    return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', body);
  }
}
