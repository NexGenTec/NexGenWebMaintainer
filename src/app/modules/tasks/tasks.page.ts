import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Task } from 'src/app/models/Task.model';
import { TaskService } from 'src/app/service/task.service';
import { AddTaskPage } from './add-task/add-task.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  task: Task[] = [];

  constructor(
    private taskService: TaskService,
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router,
  ) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(task => {
      this.task = task;
    });
  }

  async openAddTaskModal(task?: Task) {
    console.log('Tarea que se pasa al modal:', task); // Verifica el valor de task
  
    const modal = await this.modalController.create({
      component: AddTaskPage,
      componentProps: { task: task || null }
    });
  
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        if (task) {
          this.taskService.updateTask(task.id!, data.data);
        } else {
          this.taskService.addTask(data.data);
        }
      }
    });
  
    await modal.present();
  }  
  
  // Ver detalles de la tarea
  viewTask(task: Task) {
    console.log('Ver tarea:', task);
    this.router.navigate(['tasks/view-task/', task.id]);
    // Aquí puedes abrir un modal o redirigir a otra página para mostrar más detalles
  }

  editTask(task: Task) {
    console.log('Editar tarea:', task);
    // Llama al modal de edición con la tarea para modificarla
    this.openAddTaskModal(task); // Abre el modal de agregar tarea con los datos de la tarea seleccionada
  }

  // Eliminar tarea con alert
  async deleteTask(task: Task) {
    const alert = await this.alertController.create({
      mode:'ios',
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelada la eliminación');
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.taskService.deleteTask(task.id!).then(() => {
              console.log('Tarea eliminada');
              // Aquí puedes agregar un mensaje de éxito o actualizar la lista de tareas
            }).catch(err => {
              console.error('Error al eliminar la tarea:', err);
            });
          }
        }
      ]
    });

    await alert.present();
  }

}