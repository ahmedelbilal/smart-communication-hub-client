import Image from 'next/image';
import User from '../user';
import Button from '../button';

type ChatHeaderProps = {
  user: { id: string; name: string };
  onToggleInsights: () => void;
  insightsVisible: boolean;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({ user, onToggleInsights, insightsVisible }) => {
  return (
    <div className="flex items-center justify-between p-4">
      <User className="p-0 hover:bg-transparent w-fit" user={{ id: user.id, name: user.name }} />
      {!insightsVisible && (
        <Button
          onClick={onToggleInsights}
          className="p-2 rounded-xl hover:bg-gray-100 bg-white w-fit"
          title="Show Insights"
        >
          <Image src="/insight.svg" alt="Insight" width={24} height={24} />
        </Button>
      )}
    </div>
  );
};

export default ChatHeader;
