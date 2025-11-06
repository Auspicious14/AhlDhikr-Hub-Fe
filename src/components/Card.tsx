import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-lg shadow-lg p-6',
  {
    variants: {
      variant: {
        default: 'bg-white',
        transparent: 'bg-transparent shadow-none',
        bordered: 'border-2 border-transparent hover:border-brand-primary',
        flat: 'shadow-none border border-gray-200 dark:border-gray-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  hover?: boolean; // ✅ Explicitly declare hover as boolean
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  hover = false,
  onClick,
  ...props
}) => {
  const baseStyles =
    'bg-white dark:bg-gray-800 rounded-card shadow-soft transition-all duration-300';
  
  const hoverStyles = hover
    ? 'hover:shadow-medium hover:-translate-y-1 cursor-pointer'
    : '';
  const clickable = onClick ? 'cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${cardVariants({ variant })} ${hoverStyles} ${clickable} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card };
