import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service'
import 'rxjs/add/operator/map';
import { Todo } from '../../todo';

@Component({
  moduleId:module.id,
  selector: 'todos',
  templateUrl: 'todos.component.html'
})
export class TodosComponent implements OnInit { 
    todos:Todo[];    
    constructor(private _todoService:TodoService){
        
    }
    ngOnInit(){
        this.todos = [];        
        this._todoService.getTodos()          
          .subscribe(todos => {
            this.todos = todos
          });
    }
    addTodo($event, todoText){
      if($event.which === 1){
        var result;
        var newTodo = {
          text: todoText.value,
          isCompleted: false
        }
      }
      this._todoService.saveTodo(newTodo)
        .subscribe(res => {
          this.todos.push(res);
          todoText.value=''
        })
    }

    updateStatus(todo){
        var _todo ={
          _id: todo._id,
          text: todo.text,
          isCompleted: !todo.isCompleted
        };
        this._todoService.updateStatus(_todo)
          .subscribe(res=>{
            if(res.n == 1){
              this.updateTodoStatus(todo._id, todo.isCompleted)
            }
          });
        
    }
    updateTodoText($event, todo){
      if($event.which == 13){
        todo.text = $event.target.value; 
          var _todo = {
            _id : todo._id,
            text: todo.text,
            isCompleted: todo.isCompleted
        }
        this._todoService.updateStatus(_todo)
          .subscribe(res=>{
            this.setEditState(todo, todo.isCompleted, false);
          });
      }
        
    }
    private updateTodoStatus(edited_id='', status=false){
        var todos = this.todos;
        for(var i=0; i<todos.length;i++){
          if(todos[i]._id == edited_id){
            this.todos[i].isCompleted = !status;
          }
        }

    }
    
    setEditState(todo, checkedState, editState){
      if(!checkedState){
        if(editState){
          todo.isEditMode = editState;
        }else{
          delete todo.isEditMode;
        }
      }
    }
    


    deleteTodo(todo){
      var todos = this.todos;
      this._todoService.deleteTodo(todo._id)
        .subscribe(res=> {
          if(res.n == 1){
            for(var i=0; i<todos.length;i++){
                if(todos[i]._id == todo._id){
                  todos.splice(i,1);
                }
              
            }
            
          }
        });
    }
   
 }
