import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateTask, Task } from './task.type';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/task';

  findAll() {
    return this.http.get<Task[]>(this.apiUrl);
  }

  add(task: CreateTask) {
    return this.http.post<Task>(this.apiUrl, task);
  }

  delete(id : number){
    return this.http.delete<Task>(`${this.apiUrl}/${id}`);
  }

  updtade(id : number,  task : Task){
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }
}
