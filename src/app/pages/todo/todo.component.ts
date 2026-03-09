import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-4xl mx-auto py-12 px-4 animate-fade-in">
      <div class="text-center mb-12">
        <h2 class="text-6xl font-handwritten text-coffee mb-2">Today's Rituals</h2>
        <p class="text-coffee-light italic">Small steps, every day...</p>
      </div>

      <!-- Add Todo Input -->
      <div class="bg-white rounded-journal shadow-journal border-2 border-cream p-8 mb-12 transform rotate-1">
        <div class="flex gap-4">
          <input [(ngModel)]="newTodoTitle" 
                 (keyup.enter)="addTodo()"
                 placeholder="Inscribe a new task..." 
                 class="flex-1 bg-cream/30 border-none rounded-xl p-4 font-handwritten text-2xl text-coffee focus:ring-2 focus:ring-pastel-pink transition-all">
          <button (click)="addTodo()" 
                  class="bg-coffee text-white font-handwritten text-2xl px-8 py-2 rounded-sticky shadow-sticky hover:scale-105 transition-all">
            Add ✨
          </button>
        </div>
      </div>

      <!-- Todo List -->
      <div class="space-y-6">
        <div *ngIf="todos.length === 0 && !isLoading" class="text-center py-24 opacity-30 grayscale italic">
            <span class="text-6xl mb-4 block">📜</span>
            <p class="font-handwritten text-3xl text-coffee">No tasks inscribed yet.</p>
        </div>

        <div *ngFor="let todo of todos" 
             class="bg-white rounded-journal shadow-journal border-2 border-cream p-6 flex items-center justify-between group transform transition-all hover:rotate-0"
             [class.-rotate-1]="todo.id % 2 === 0"
             [class.rotate-1]="todo.id % 2 !== 0">
          
          <div class="flex items-center gap-6 flex-1">
            <button (click)="toggleTodo(todo)" 
                    class="w-10 h-10 rounded-xl border-4 border-cream flex items-center justify-center transition-all"
                    [class.bg-mint]="todo.isCompleted"
                    [class.border-mint]="todo.isCompleted">
              <span *ngIf="todo.isCompleted" class="text-white text-xl">✓</span>
            </button>
            <span class="font-handwritten text-3xl text-coffee transition-all"
                  [class.line-through]="todo.isCompleted"
                  [class.opacity-40]="todo.isCompleted">
              {{ todo.title }}
            </span>
          </div>

          <button (click)="deleteTodo(todo.id)" 
                  class="opacity-0 group-hover:opacity-100 text-pastel-pink hover:text-red-600 font-bold uppercase text-[10px] tracking-widest transition-all">
            Tear Out 🗑️
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; min-height: 100vh; background-color: transparent; }
    input::placeholder { font-family: 'Outfit', sans-serif; font-size: 1rem; opacity: 0.5; }
  `]
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle = '';
  isLoading = true;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.isLoading = true;
    this.todoService.getTodos().subscribe({
      next: (res) => {
        this.todos = res;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  addTodo(): void {
    if (!this.newTodoTitle.trim()) return;
    this.todoService.addTodo(this.newTodoTitle).subscribe({
      next: (todo) => {
        this.todos.unshift(todo);
        this.newTodoTitle = '';
      }
    });
  }

  toggleTodo(todo: Todo): void {
    this.todoService.toggleTodo(todo.id).subscribe({
      next: (updated) => {
        todo.isCompleted = updated.isCompleted;
      }
    });
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter(t => t.id !== id);
      }
    });
  }
}
