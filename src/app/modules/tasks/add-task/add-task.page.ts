import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Timestamp } from 'firebase/firestore';
import { Task } from 'src/app/models/Task.model';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage {

  task: Task = {
    title: '',
    description: '',
    status: 'pending',
    createdAt: Timestamp.fromDate(new Date()) // Utiliza el Timestamp de Firestore
  };

  constructor(
    private modalController: ModalController,
    private taskService: TaskService,
  ) {}

  // Cierra el modal sin enviar nada
  closeModal() {
    this.modalController.dismiss();
  }

  // Guarda la tarea si todos los campos son válidos
  saveTask() {
    if (this.isFormValid()) {
      console.log('Tarea guardada:', this.task);
      this.modalController.dismiss(this.task); // Enviar la tarea al componente principal
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }

  isFormValid(): boolean {
    return this.task.title.trim() !== '' && this.task.status !== undefined && this.task.description.trim() !== undefined;
  }
}
