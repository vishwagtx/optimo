import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from './interfaces/taskData';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Array<Task>>;

  pendingTasks = false;
  completedTasks = false;
  overDueTasks = false;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    const dt = new Date();
    this.tasks$ = this.tasksService.getTasks().pipe(
      map((m) =>
        m.map((n) => {
          n.status = this.setStatus(n.attributes, dt);
          return n;
        })
      )
    );
  }

  private setStatus(attribute: any, date: Date): string {
    return attribute.cancelled
      ? 'Cancelled'
      : attribute.completed
      ? 'Completed'
      : attribute.dueDate > date
      ? 'Overdue'
      : 'Pending';
  }

  checkboxChange(): void {
    const dt = new Date();
    this.tasks$ = this.tasksService
      .getTaskWithFilters(
        this.completedTasks,
        this.overDueTasks,
        this.pendingTasks
      )
      .pipe(
        map((m) =>
          m.map((n) => {
            n.status = this.setStatus(n.attributes, dt);
            return n;
          })
        )
      );
  }
}
