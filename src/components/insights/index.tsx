import Image from 'next/image';
import Separator from '../separator';
import Button from '../button';

export type InsightsProps = {
  onClose: () => void;
};

const Insights: React.FC<InsightsProps> = ({ onClose }) => {
  return (
    <aside className="flex flex-col w-full shrink-0 md:w-1/3 h-full border-l border-gray-100 transition-all duration-300 absolute md:static inset-0 z-10 bg-white">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-semibold">Insights</h2>
        <Button className="p-2 rounded-xl hover:bg-gray-100 bg-white w-fit" onClick={onClose}>
          <Image src="/cross.svg" alt="Cross" width={24} height={24} />
        </Button>
      </div>
      <Separator />
      <p className="mt-auto mb-auto text-center">No Summary</p>
    </aside>
  );
};

export default Insights;
