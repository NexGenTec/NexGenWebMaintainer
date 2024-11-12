import { Timestamp } from 'firebase/firestore';

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority?: "low" | "medium" | "high";  // Prioridad de la tarea
  createdAt: Timestamp;  // Usar Timestamp de Firestore
  dueDate?: Timestamp;  // Usar Timestamp de Firestore
  completedAt?: Timestamp;  // Usar Timestamp de Firestore
  tags?: string[];
  assignee?: string;  // Persona asignada a la tarea
  estimatedTime?: number;  // Tiempo estimado en horas o minutos
  subtasks?: Task[];  // Subtareas anidadas, para tareas complejas
  attachments?: string[];  // URLs de archivos adjuntos
}


// export interface Task {
//   id: string;
//   projectId: string;
//   title: string;
//   description: string;
//   assignedTo: string;
//   status: 'toDo' | 'inProgress' | 'completed';
//   priority: 'low' | 'medium' | 'high';
//   dueDate?: Date;
//   createdAt: Date;
//   tags?: string[];
//   subTasks?: SubTask[];
//   changeHistory: ChangeLog[];
// }

// export interface SubTask {
//   id: string;
//   title: string;
//   completed: boolean;
// }

// export interface ChangeLog {
//   changedBy: string;
//   changedAt: Date;
//   changes: string;
// }
