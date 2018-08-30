"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var todo_service_1 = require("../../services/todo.service");
require("rxjs/add/operator/map");
var TodosComponent = (function () {
    function TodosComponent(_todoService) {
        this._todoService = _todoService;
    }
    TodosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.todos = [];
        this._todoService.getTodos()
            .subscribe(function (todos) {
            _this.todos = todos;
        });
    };
    TodosComponent.prototype.addTodo = function ($event, todoText) {
        var _this = this;
        if ($event.which === 1) {
            var result;
            var newTodo = {
                text: todoText.value,
                isCompleted: false
            };
        }
        this._todoService.saveTodo(newTodo)
            .subscribe(function (res) {
            _this.todos.push(res);
            todoText.value = '';
        });
    };
    TodosComponent.prototype.updateStatus = function (todo) {
        var _this = this;
        var _todo = {
            _id: todo._id,
            text: todo.text,
            isCompleted: !todo.isCompleted
        };
        this._todoService.updateStatus(_todo)
            .subscribe(function (res) {
            if (res.n == 1) {
                _this.updateTodoStatus(todo._id, todo.isCompleted);
            }
        });
    };
    TodosComponent.prototype.updateTodoText = function ($event, todo) {
        var _this = this;
        if ($event.which == 13) {
            todo.text = $event.target.value;
            var _todo = {
                _id: todo._id,
                text: todo.text,
                isCompleted: todo.isCompleted
            };
            this._todoService.updateStatus(_todo)
                .subscribe(function (res) {
                _this.setEditState(todo, todo.isCompleted, false);
            });
        }
    };
    TodosComponent.prototype.updateTodoStatus = function (edited_id, status) {
        if (edited_id === void 0) { edited_id = ''; }
        if (status === void 0) { status = false; }
        var todos = this.todos;
        for (var i = 0; i < todos.length; i++) {
            if (todos[i]._id == edited_id) {
                this.todos[i].isCompleted = !status;
            }
        }
    };
    TodosComponent.prototype.setEditState = function (todo, checkedState, editState) {
        if (!checkedState) {
            if (editState) {
                todo.isEditMode = editState;
            }
            else {
                delete todo.isEditMode;
            }
        }
    };
    TodosComponent.prototype.deleteTodo = function (todo) {
        var todos = this.todos;
        this._todoService.deleteTodo(todo._id)
            .subscribe(function (res) {
            if (res.n == 1) {
                for (var i = 0; i < todos.length; i++) {
                    if (todos[i]._id == todo._id) {
                        todos.splice(i, 1);
                    }
                }
            }
        });
    };
    return TodosComponent;
}());
TodosComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'todos',
        templateUrl: 'todos.component.html'
    }),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodosComponent);
exports.TodosComponent = TodosComponent;
//# sourceMappingURL=todos.component.js.map