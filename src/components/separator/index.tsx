import { cn } from '@/lib/utils';

export type SeparatorProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHRElement>,
  HTMLHRElement
>;

const Separator: React.FC<SeparatorProps> = ({ className, ...props }) => {
  return <hr className={cn('text-gray-100', className)} {...props} />;
};

export default Separator;
