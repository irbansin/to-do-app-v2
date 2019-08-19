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
      Validators.required
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
    this.add.emit(this.newTodo);
    this.newTodo = new Todo();
    this.accountForm.reset();
  }

}
