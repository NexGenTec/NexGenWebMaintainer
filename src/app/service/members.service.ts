import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Members } from 'src/app/models/Members.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  constructor(private firestore: AngularFirestore) {}
  

  /**
   * Obtiene la lista de todos los miembros.
  */
  getMembers(): Observable<Members[]> {
    return this.firestore.collection<Members>('members').valueChanges();
  }

  /**
   * Obtiene un miembro específico por su ID.
   * @param id - ID del miembro.
   * @returns Observable con los datos del miembro.
  */
  getMemberById(id: string): Observable<Members | undefined> {
    return this.firestore.collection('members').doc<Members>(id).valueChanges();
  }


  /**
   * Añade un nuevo miembro a la colección.
   * @param member - Datos del miembro a añadir.
  */
  addMember(member: Members) {
    const memberId = this.firestore.createId();
    return this.firestore.collection('members').doc(memberId).set({
      ...member,
      id: memberId
    });
  }
}
