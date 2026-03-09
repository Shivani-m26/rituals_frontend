import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:8080/api/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(title: string): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, { title });
  }

  toggleTodo(id: number): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/${id}/toggle`, {});
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
