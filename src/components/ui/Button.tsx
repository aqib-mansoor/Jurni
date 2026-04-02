import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = ({
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  children,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: 'bg-champagne text-midnight shadow-xl hover:shadow-hover hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-midnight text-pearl shadow-xl hover:bg-opacity-90 hover:scale-[1.02] active:scale-[0.98]',
    outline: 'border-2 border-champagne text-champagne hover:bg-champagne hover:text-midnight',
    ghost: 'text-midnight hover:bg-midnight hover:bg-opacity-5',
    danger: 'bg-rose text-white hover:bg-opacity-90',
  };

  const sizes = {
    sm: 'px-6 py-3 text-[10px] tracking-[0.2em]',
    md: 'px-8 py-4 text-[12px] tracking-[0.3em]',
    lg: 'px-12 py-5 text-[14px] font-serif tracking-[0.4em]',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-bold uppercase transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
};
