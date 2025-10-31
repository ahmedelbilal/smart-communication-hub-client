import { Conversation } from '@/types/conversation';
import Link from 'next/link';
import User from '../user';

export type ConversationsProps = {
  conversations: Conversation[];
};
const Conversations: React.FC<ConversationsProps> = ({ conversations }) => {
  return (
    <div className="grow">
      {conversations.map((conversation) => (
        <Link href={`/c/${conversation.id}`} key={conversation.id}>
          <User user={{ id: conversation.user.id, name: conversation.user.name }} />
        </Link>
      ))}
    </div>
  );
};

export default Conversations;
