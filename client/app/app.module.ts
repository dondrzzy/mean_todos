import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoService } from './services/todo.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule ],
  declarations: [ AppComponent, TodosComponent ],
  providers: [ TodoService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
