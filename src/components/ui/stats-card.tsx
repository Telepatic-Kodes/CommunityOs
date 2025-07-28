import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  ({ title, value, description, icon: Icon, trend, className }, ref) => {
    return (
      <Card ref={ref} className={cn('border-0 shadow-md hover:shadow-lg transition-all duration-500 hover-lift font-serif group card-modern animate-slide-in-bottom', className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4">
          <CardTitle className="text-sm sm:text-base font-semibold text-neutral-700 tracking-wide group-hover:text-neutral-900 transition-colors duration-300">
            {title}
          </CardTitle>
          {Icon && (
            <div className="p-2 sm:p-3 bg-neutral-100 rounded-lg sm:rounded-xl group-hover:bg-neutral-200 transition-all duration-300 shadow-sm group-hover:shadow-md hover-scale-modern">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-neutral-600 group-hover:text-neutral-800 group-hover:scale-110 transition-all duration-300" />
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient tracking-tight group-hover:scale-105 transition-all duration-300">
            {value}
          </div>
          {description && (
            <p className="text-sm sm:text-base text-neutral-600 font-medium group-hover:text-neutral-700 transition-colors duration-300">
              {description}
            </p>
          )}
          {trend && (
            <div className="flex items-center pt-2">
              <div className={cn(
                'flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105',
                trend.isPositive 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              )}>
                {trend.isPositive ? (
                  <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
                )}
                {trend.isPositive ? '+' : ''}{trend.value}%
              </div>
              <span className="text-xs sm:text-sm text-neutral-600 ml-2 sm:ml-3 font-medium group-hover:text-neutral-700 transition-colors duration-300">
                vs mes anterior
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);

StatsCard.displayName = 'StatsCard';

export { StatsCard }; 