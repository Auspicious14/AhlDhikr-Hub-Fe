/* import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-lg shadow-lg p-6',
  {
    variants: {
      variant: {
        default: 'bg-white',
        transparent: 'bg-transparent shadow-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={cardVariants({ variant, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

export { Card, cardVariants };
*/

import React from 'react';
import { ChevronRight, Bookmark, Share2 } from 'lucide-react';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false,
  onClick,
  ...props 
}) => {
  const baseStyles = 'bg-white dark:bg-gray-800 rounded-card shadow-soft transition-all duration-300';
  
  const variants = {
    default: '',
    bordered: 'border-2 border-transparent hover:border-brand-primary',
    flat: 'shadow-none border border-gray-200 dark:border-gray-700',
  };
  
  const hoverStyles = hover ? 'hover:shadow-medium hover:-translate-y-1 cursor-pointer' : '';
  const clickable = onClick ? 'cursor-pointer' : '';
  
  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${clickable} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card };
