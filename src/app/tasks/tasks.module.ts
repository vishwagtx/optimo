import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { SharedModule } from '../shared/shared.module';
import { TasksService } from './services/tasks.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '../shared/providers/http-interceptor.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [TasksComponent, TaskDetailComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    MatExpansionModule,
    MatCheckboxModule,
  ],
  providers: [
    TasksService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
})
export class TasksModule {}
