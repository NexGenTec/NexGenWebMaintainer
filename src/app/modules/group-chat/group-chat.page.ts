import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.page.html',
  styleUrls: ['./group-chat.page.scss'],
})
export class GroupChatPage implements OnInit, OnDestroy {

  public messages!: Observable<any[]>;
  public newMessage: string = '';
  private chatId: string = '';
  private otherUserId: string = 'O6pqOLKa3WXjGtGAhiXZ0axp5mG2';
  public currentUserId: string = '';
  public isTyping: boolean = false;
  private typingSubscription!: Subscription;

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {}

  ngOnInit() {
    this.auth.authState.subscribe(user => {
      if (user && this.otherUserId) {
        this.currentUserId = user.uid;
        this.chatId = this.generateChatId(user.uid, this.otherUserId);

        const messagesCollection = this.firestore.collection(`chats/${this.chatId}/messages`, ref => ref.orderBy('timestamp'));
        this.messages = messagesCollection.valueChanges({ idField: 'id' });

        // Inicializar el estado de conexión
        this.setOnlineStatus(true);

        // Suscribirse a cambios en el estado de escritura del otro usuario
        this.typingSubscription = this.firestore.doc(`chats/${this.chatId}/typing`).valueChanges()
          .subscribe((typingStatus: any) => {
            if (typingStatus) {
              this.isTyping = typingStatus.userId === this.otherUserId && typingStatus.isTyping;
            }
          });
      } else {
        console.error("Usuario no autenticado o ID del otro usuario no especificado.");
      }
    });
  }

  ngOnDestroy() {
    this.setOnlineStatus(false);
    if (this.typingSubscription) {
      this.typingSubscription.unsubscribe();
    }
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
      this.updateTypingStatus(false); // Detener el estado de escritura
    }
  }

  generateChatId(uid1: string, uid2: string): string {
    return [uid1, uid2].sort().join('_');
  }

  async setOnlineStatus(isOnline: boolean) {
    const user = await this.auth.currentUser;
    if (user) {
      const userStatusRef = this.firestore.doc(`users/${user.uid}`);
      await userStatusRef.set({ isOnline }, { merge: true });
    }
  }

  updateTypingStatus(isTyping: boolean) {
    this.firestore.doc(`chats/${this.chatId}/typing`).set({
      userId: this.currentUserId,
      isTyping: isTyping
    });
  }

  onTyping() {
    this.updateTypingStatus(true);
  }

  onStopTyping() {
    this.updateTypingStatus(false);
  }
}
