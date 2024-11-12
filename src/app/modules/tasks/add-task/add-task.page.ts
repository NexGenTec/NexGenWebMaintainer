import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Timestamp } from 'firebase/firestore';
import { Task } from 'src/app/models/Task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {

  task: Task = {
    title: '',
    description: '',
    status: 'pending',
    createdAt: Timestamp.fromDate(new Date())
  };

  constructor(
    private modalController: ModalController,
    private navParams: NavParams, // Para recibir los datos pasados al modal
  ) {}

  ngOnInit() {
    const taskData = this.navParams.get('task');
    console.log('Tarea recibida en el modal:', taskData);
  
    if (taskData) {
      this.task = { ...taskData };
    } else {
      // Si no se pasa ninguna tarea, la inicializamos con valores vacíos
      this.task = {
        title: '',
        description: '',
        status: 'pending',
        createdAt: Timestamp.fromDate(new Date())
      };
    }
  }    

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
    return this.task.title.trim() !== '' && 
           this.task.description.trim() !== '' && 
           ['pending', 'in-progress', 'completed'].includes(this.task.status);
  }
}
