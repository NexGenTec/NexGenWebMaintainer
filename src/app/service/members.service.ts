import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Members } from '../models/Members.model';
@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private membersCollection: AngularFirestoreCollection<Members>;

  constructor(private firestore: AngularFirestore) {
    this.membersCollection = firestore.collection<Members>('members'); // colección en Firestore
  }

  // Obtener todos los miembros
  getMembers(): Observable<Members[]> {
    return this.membersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Members;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  // Obtener un miembro por ID
  getMemberById(id: string): Observable<Members> {
    return this.membersCollection.doc<Members>(id).valueChanges().pipe(
      map(member => ({ id, ...member! }))
    );
  }

  // Agregar un nuevo miembro
  addMember(member: Members): Promise<any> {
    return this.membersCollection.add(member);
  }

  // Actualizar un miembro existente por ID
  updateMember(id: string, member: Members): Promise<void> {
    return this.membersCollection.doc(id).update(member);
  }

  // Eliminar un miembro por ID
  deleteMember(id: string): Promise<void> {
    return this.membersCollection.doc(id).delete();
  }
}
