import * as React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success' | 'info';
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-neutral-50 border-neutral-200 text-neutral-900',
      destructive: 'bg-neutral-50 border-neutral-200 text-neutral-900',
      success: 'bg-neutral-50 border-neutral-200 text-neutral-900',
      info: 'bg-neutral-50 border-neutral-200 text-neutral-900'
    };

    const icons = {
      default: Info,
      destructive: XCircle,
      success: CheckCircle,
      info: Info
    };

    const Icon = icons[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative w-full rounded-lg border p-4',
          variants[variant],
          className
        )}
        {...props}
      >
        <div className="flex items-start space-x-3">
          <Icon className="h-4 w-4 mt-0.5 text-neutral-600" />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-neutral-600', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription }; 