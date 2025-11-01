import { Conversation } from '@/types/conversation';
import Link from 'next/link';
import User from '../user';
import { usePathname } from 'next/navigation';

export type ConversationsProps = {
  conversations: Conversation[];
};
const Conversations: React.FC<ConversationsProps> = ({ conversations }) => {
  const pathname = usePathname();

  return (
    <div className="grow flex flex-col gap-y-2">
      {conversations.map((conversation) => (
        <Link href={`/c/${conversation.id}`} key={conversation.id}>
          <User active={pathname.includes(conversation.id || '')} user={conversation.user} />
        </Link>
      ))}
    </div>
  );
};

export default Conversations;
