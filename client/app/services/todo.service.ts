import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService{
    apiUrl:string = '/api/v1/todo';
    constructor(public _http:Http){

    }
    getTodos(){
        return this._http.get(this.apiUrl+'s')
            .map(res=>res.json());
    }
    saveTodo(todo){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this.apiUrl, JSON.stringify(todo), {headers:headers})
            .map(res=>res.json());
    }
    updateStatus(todo){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log(JSON.stringify(todo));
        return this._http.put(this.apiUrl+'/'+todo._id, JSON.stringify(todo), {headers:headers})
            .map(res=>res.json());
    }
    deleteTodo(_id){
        return this._http.delete(this.apiUrl+_id)
            .map(res=>res.json());
    }
}


