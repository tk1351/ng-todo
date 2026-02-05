import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo, CreateTodoBody, ToggleTodoBody } from '../models/todo';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/todos';

  setup() {
    console.log('🚀 TodoService');
  }

  getTodos(start = 0, limit = 10): Observable<Todo[]> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
    });
    return this.http.get<Todo[]>(`${this.API_URL}?_start=${start}&_limit=${limit}`, { headers });
  }

  createTodo(body: CreateTodoBody): Observable<Todo> {
    return this.http.post<Todo>(`${this.API_URL}`, body);
  }

  toggleTodo({ id, completed }: ToggleTodoBody): Observable<Todo> {
    return this.http.patch<Todo>(`${this.API_URL}/${id}`, { completed });
  }
}
