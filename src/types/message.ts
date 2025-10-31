import { Conversation } from './conversation';
import { User } from './user';

export type Message = {
  id: string;
  content: string;
  sender: User;
  conversation?: Conversation;
  createdAt: string;
};

export type SendMessageDto = {
  content: string;
  receiverId: string;
  createdAt: string;
};
