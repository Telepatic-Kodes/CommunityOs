import * as React from 'react';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  src?: string;
  alt?: string;
  fallback?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = 'md', src, alt, fallback, ...props }, ref) => {
    const sizes = {
      sm: 'w-10 h-10 text-sm',
      md: 'w-12 h-12 text-base',
      lg: 'w-16 h-16 text-lg',
      xl: 'w-20 h-20 text-xl'
    };

    const [imageError, setImageError] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex shrink-0 overflow-hidden rounded-full bg-neutral-100 shadow-sm border-2 border-neutral-200 transition-all duration-300 hover:shadow-md',
          sizes[size],
          className
        )}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt}
            className="aspect-square h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-neutral-700 font-bold font-serif">
            {fallback ? (
              fallback.slice(0, 2).toUpperCase()
            ) : (
              <User 
                className="h-1/2 w-1/2 text-neutral-600"
                aria-hidden="true"
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar }; 