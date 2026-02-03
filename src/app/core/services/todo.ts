import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);

  setup() {
    console.log('🚀 TodoService');
  }

  todos() {
    const response = this.http
      .get('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5')
      .subscribe({
        next: (data) => {
          console.log('data', data);
        },
      });
    console.log(response);
  }
}
