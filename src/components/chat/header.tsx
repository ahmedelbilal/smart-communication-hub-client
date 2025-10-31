import { SparklesIcon } from 'lucide-react';
import User from '../user';

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
        <button
          onClick={onToggleInsights}
          className="p-2 rounded-xl hover:bg-gray-100 transition"
          title="Show Insights"
        >
          <SparklesIcon size={20} />
        </button>
      )}
    </div>
  );
};

export default ChatHeader;
