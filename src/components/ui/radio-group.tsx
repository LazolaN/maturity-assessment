import * as React from 'react';
import { cn } from '@/lib/utils';

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroupContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
}>({});

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, ...props }, ref) => {
    return (
      <RadioGroupContext.Provider value={{ value, onValueChange }}>
        <div
          ref={ref}
          className={cn('grid gap-2', className)}
          role="radiogroup"
          {...props}
        />
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

interface RadioGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(RadioGroupContext);
    const isSelected = context.value === value;

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={isSelected}
        className={cn(
          'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          isSelected && 'bg-primary',
          className
        )}
        onClick={() => context.onValueChange?.(value)}
        {...props}
      >
        {isSelected && (
          <span className="flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-primary-foreground" />
          </span>
        )}
      </button>
    );
  }
);
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
