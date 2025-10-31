import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import Loader from '../loader';

export type ButtonProps = { loading?: boolean } & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<ButtonProps> = ({ loading, children, className, ...props }) => {
  return (
    <button
      className={cn(
        'flex items-center justify-center gap-4 bg-black text-white w-full p-4 rounded-2xl hover:bg-black/80 disabled:bg-black/80 transition cursor-pointer',
        className
      )}
      {...props}
    >
      {loading && <Loader color="white" />}
      {children}
    </button>
  );
};

export default Button;
