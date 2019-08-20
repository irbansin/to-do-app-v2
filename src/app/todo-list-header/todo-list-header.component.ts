import { Component, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list-header',
  templateUrl: './todo-list-header.component.html',
  styleUrls: ['./todo-list-header.component.css']
})
export class TodoListHeaderComponent {

  accountForm = new FormGroup({
    todoInput: new FormControl(
      '',
      Validators.compose([Validators.required, this.todoExistsValidator])
    )
  });
  // _________________________________________________________________
  newTodo: Todo = new Todo();
  // _________________________________________________________________
  // form = new FormGroup({
  //   todoInput: new FormControl('',
  //          [Validators.required])
  // });
  // _________________________________________________________________

  get todoInput() {
    return this.accountForm.get('todoInput');
  }

  @Output()
  add: EventEmitter<Todo> = new EventEmitter();

  constructor() {
  }

  addTodo() {
    this.newTodo.title = this.todoInput.value;
    console.log(this.getAllTodos());

    this.add.emit(this.newTodo);
    this.newTodo = new Todo();
    this.accountForm.reset();
  }

  getAllTodos(): Todo[] {
    const localStorageItem = JSON.parse(localStorage.getItem('todos'));
    return localStorageItem == null ? [] : localStorageItem.todos;
  }

  checkTodos(todo: Todo): boolean {
    // const todos = this.getAllTodos();

    // todos.forEach(element => {
    //   if (element.title === todo.title) {
    //     return true;
    //   }
    // });
    return false;
  }

  todoExistsValidator(control: FormControl) {
    let todos: Todo[] = [];
    const localStorageItem = JSON.parse(localStorage.getItem('todos'));
    todos = localStorageItem == null ? [] : localStorageItem.todos;

    let exists: boolean;

    todos.forEach(element => {
      if (element.title === control.value) {
        exists = true;
      } else {
        exists = false;
      }

    });

    return exists ? {todoExists: true} : null;
  }
}


