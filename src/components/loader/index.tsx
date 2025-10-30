import { cn } from '@/lib/utils';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type LoaderProps = { size?: number } & DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Loader: React.FC<LoaderProps> = ({
  size = 24,
  color = 'text-blue-600',
  className,
  ...props
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn('inline-flex items-center gap-3', className)}
      {...props}
    >
      <svg
        className={`animate-spin ${color}`}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
    </div>
  );
};

export default Loader;
