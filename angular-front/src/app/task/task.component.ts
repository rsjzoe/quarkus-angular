import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from './task.type';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  imports: [FormsModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  newTitle: string = '';
  newDescription = '';

  constructor(private taskService: TaskService) {}

  addTask() {
    if (this.newTitle.trim().length > 0) {
      // this.tasks.push({
      //   id: Date.now(),
      //   title: this.newTitle,
      //   description: this.newDescription,
      //   completed: false,
      // });
      this.taskService
        .add({
          title: this.newTitle,
          description: this.newDescription,
          completed: false,
        })
        .subscribe({
          next: (newTask) => {
            // newTask : Task creer retourné par l'API
            this.tasks.push(newTask);
            this.newTitle = '';
            this.newDescription = '';
          },
        });
    }
  }

  deleteTask(id: number) {
    this.taskService.delete(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((task) => task.id !== id);
      },
      error : (error)=>{
        console.log("erreur de la suppresssion : " + error);
      }
    });
  }

  toggleTask(task: Task) {
    task.completed = !task.completed;
  }

  ngOnInit() {
    this.taskService.findAll().subscribe({
      next: (data) => {
        this.tasks = data; // Remplir le tableau des tâches
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des tâches :', error);
      },
    });
  }
}

type Sub = {
  next: (value: string) => void;
};
function subscribe(sub: Sub) {
  sub.next('eto le donnee azoo avy amle api');
}

subscribe({
  next: (value) => {
    console.log('nahazo donnee zah');
    // console.log(value)
  },
});
