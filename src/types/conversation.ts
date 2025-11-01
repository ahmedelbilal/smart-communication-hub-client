import { Insight } from './insight';
import { Message } from './message';
import { User } from './user';

export type Conversation = {
  id?: string;
  user: User;
  messages: Message[];
  insight: Insight | null;
};
