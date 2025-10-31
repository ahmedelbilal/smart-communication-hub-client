import { cn } from '@/lib/utils';

export type AvatarPropsProps = { text: string } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

const Avatar: React.FC<AvatarPropsProps> = ({ text, className, ...props }) => {
  return (
    <span
      className={cn(
        'w-9 h-9 flex items-center justify-center bg-amber-200 text-amber-800 font-semibold rounded-full',
        className
      )}
      {...props}
    >
      {text.charAt(0).toUpperCase()}
    </span>
  );
};

export default Avatar;
