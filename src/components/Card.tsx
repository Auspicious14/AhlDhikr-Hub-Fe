/* import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-xl shadow-lg transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-gray-800',
        transparent: 'bg-transparent shadow-none',
        bordered: 'border-2 border-transparent hover:border-brand-primary',
        flat: 'shadow-none border border-gray-200 dark:border-gray-700',
      },
      hover: {
        true: 'hover:shadow-xl hover:-translate-y-1 cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      hover: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  hover?: boolean;
  onClick?: () => void;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hover, onClick, children, ...props }, ref) => {
    const classes = [
      cardVariants({ variant, hover: hover ? ('true' as const) : ('false' as const), }),
      onClick && 'cursor-pointer',
      className
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={classes}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
*/

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-xl shadow-lg transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-gray-800',
        transparent: 'bg-transparent shadow-none',
        bordered: 'border-2 border-transparent hover:border-brand-primary',
        flat: 'shadow-none border border-gray-200 dark:border-gray-700',
      },
      hover: {
        // Explicitly use string keys
        true: 'hover:shadow-xl hover:-translate-y-1 cursor-pointer',
        false: '',
      } as const,
    },
    defaultVariants: {
      variant: 'default',
      hover: false,
    },
  }
);

// Fix the inferred type by overriding hover to accept string | boolean
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof cardVariants>, 'hover'> {
  hover?: boolean;
  onClick?: () => void;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hover, onClick, children, ...props }, ref) => {
    const classes = [
      cardVariants({
        variant,
        // Safely pass string, with explicit cast to satisfy cva
        hover: (hover ? 'true' : 'false') as 'true' | 'false',
      }),
      onClick && 'cursor-pointer',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={classes}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
