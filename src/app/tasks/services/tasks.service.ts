import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../interfaces/taskData';

@Injectable()
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Array<Task>> {
    return this.http
      .get<any>(`test/tasks?DueOn=7&include=AssignedUsers`)
      .pipe(map((m) => m.data));
  }

  getTaskWithFilters(
    completed: boolean,
    overdue: boolean,
    outstanding: boolean,
    cancelled: boolean = false
  ): Observable<Array<Task>> {
    return this.http
      .get<any>(
        `test/tasks?DueOn=7&IncludeCompleted=${completed}&IncludeOutstanding=${outstanding}&IncludeOverdue=${overdue}&IncludeCancelled=${cancelled}`
      )
      .pipe(map((m) => m.data ?? {}));
  }
}
