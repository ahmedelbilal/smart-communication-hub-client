import { cn } from '@/lib/utils';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type AlertProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

const Alert: React.FC<AlertProps> = ({ className, ...props }) => {
  return (
    <p
      className={cn(
        'text-red-500 bg-red-50 p-4 rounded-2xl border border-red-500 font-medium',
        className
      )}
      {...props}
    />
  );
};

export default Alert;
