import { cn } from '@/lib/utils';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return <input className={cn('bg-gray-100 p-4 rounded-2xl w-full', className)} {...props} />;
};

export default Input;
