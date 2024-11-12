import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';
import { Task } from 'src/app/models/Task.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.page.html',
  styleUrls: ['./view-task.page.scss'],
})
export class ViewTaskPage implements OnInit {

  task: Task | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.loadMemberData();
  }
  
  loadMemberData() {
    this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const taskId = params.get('id');
        if (taskId) {
          return this.taskService.getTaskById(taskId); 
        } else {
          throw new Error('ID de la tarea no encontrado');
        }
      })
    ).subscribe({
      next: (data: Task | undefined) => {
        this.task = data;
        console.log('Tarea recibida:', this.task);
      },
      error: (error) => {
        console.error('Error al cargar los detalles de la tarea:', error);
      },
      complete: () => {
        console.log('Carga de datos completada');
      }
    });
  }
}
