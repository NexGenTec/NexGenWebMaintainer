import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';  
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Importa AngularFireAuth
import { Observable } from 'rxjs';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.page.html',
  styleUrls: ['./group-chat.page.scss'],
})
export class GroupChatPage implements OnInit {

  public messages!: Observable<any[]>;
  public newMessage: string = '';
  private chatId: string = '';
  private otherUserId: string = 'O6pqOLKa3WXjGtGAhiXZ0axp5mG2'; // Reemplaza o asigna dinámicamente

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {}

  ngOnInit() {
    this.auth.authState.subscribe(user => {
      if (user && this.otherUserId) {
        this.chatId = this.generateChatId(user.uid, this.otherUserId);
        
        const messagesCollection = this.firestore.collection(`chats/${this.chatId}/messages`);
        this.messages = messagesCollection.valueChanges({ idField: 'id' });
      } else {
        console.error("Usuario no autenticado o ID del otro usuario no especificado.");
      }
    });
  }

  async sendMessage() {
    const user = await this.auth.currentUser;
    if (user && this.newMessage.trim() !== '') {
      const messagesCollection = this.firestore.collection(`chats/${this.chatId}/messages`);
      const message = {
        message: this.newMessage,
        senderId: user.uid,
        timestamp: new Date()
      };
      await messagesCollection.add(message);
      this.newMessage = ''; // Limpiar el campo de entrada
    }
  }

  generateChatId(uid1: string, uid2: string): string {
    return [uid1, uid2].sort().join('_');
  }
}
