import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

@Component({
  selector: 'app-task',
  imports: [FormsModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  tasks: Task[] = [];
  newTitle: string = '';
  newDescription = '';

  addTask() {
    if (this.newTitle.trim()) {
      this.tasks.push({
        id: Date.now(),
        title: this.newTitle,
        description: this.newDescription,
        completed: false,
      });
      this.newTitle = '';
      this.newDescription = '';
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  toggleTask(task: Task) {
    task.completed = !task.completed;
  }
  
}
