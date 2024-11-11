import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/Task.model';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksCollection: AngularFirestoreCollection<Task>;

  constructor(private firestore: AngularFirestore) {
    // Inicia la colección de tareas en Firestore
    this.tasksCollection = firestore.collection<Task>('tasks');
  }

  /**
   * Obtiene todas las tareas de la colección.
   * @returns Un Observable que emite un array de tareas (`Task[]`) con sus respectivos IDs.
   */
  getTasks(): Observable<Task[]> {
    return this.tasksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Task;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  /**
   * Obtiene una tarea específica por su ID.
   * @param id - El ID de la tarea que se quiere obtener.
   * @returns Un Observable que emite la tarea encontrada, o `undefined` si no se encuentra.
   */
  getTaskById(id: string): Observable<Task | undefined> {
    return this.tasksCollection.doc<Task>(id).valueChanges().pipe(
      map(task => {
        if (task) {
          return {
            ...task,
            createdAt: task.createdAt,
            dueDate: task.dueDate,
            completedAt: task.completedAt
          };
        }
        return undefined;
      })
    );
  }  
  

  /**
   * Añade una nueva tarea a la colección.
   * @param task - Un objeto `Task` que contiene los datos de la tarea a agregar.
   * @returns Una Promesa que se resuelve cuando la tarea se ha agregado correctamente.
   */
  addTask(task: Task): Promise<void> {
    const taskId = this.firestore.createId();
    return this.firestore.collection('tasks').doc(taskId).set({
      ...task,
      id: taskId
    });
  }

  /**
   * Actualiza una tarea existente en la colección.
   * @param id - El ID de la tarea que se desea actualizar.
   * @param updatedTask - Un objeto parcial de `Task` que contiene solo los campos a actualizar.
   * @returns Una Promesa que se resuelve cuando la tarea ha sido actualizada correctamente.
   */
  updateTask(id: string, updatedTask: Partial<Task>): Promise<void> {
    return this.tasksCollection.doc(id).update(updatedTask);
  }

  /**
   * Elimina una tarea de la colección.
   * @param id - El ID de la tarea que se desea eliminar.
   * @returns Una Promesa que se resuelve cuando la tarea ha sido eliminada correctamente.
   */
  deleteTask(id: string): Promise<void> {
    return this.tasksCollection.doc(id).delete();
  }
}
