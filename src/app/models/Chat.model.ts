export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  roomId: string;
  messageType: 'text' | 'image' | 'video';
  mediaUrl?: string;
  reactions: Reaction[];
}

export interface Reaction {
  userId: string;
  type: 'like' | 'love' | 'laugh' | 'surprise' | 'sad' | 'angry';
}

export interface ChatRoom {
  id: string;
  name: string;
  participants: string[];
  isPrivate: boolean;
  createdAt: Date;
  createdBy: string;
}
