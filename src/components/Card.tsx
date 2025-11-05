import React from 'react';
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
