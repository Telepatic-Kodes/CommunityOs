import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  description?: string;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export function MetricsCard({ 
  title, 
  value, 
  description, 
  change, 
  changeType = 'neutral',
  icon,
  trend = 'neutral'
}: MetricsCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeText = () => {
    if (!change) return null;
    
    const prefix = change > 0 ? '+' : '';
    return `${prefix}${change}%`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && (
          <div className="h-4 w-4 text-gray-600">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        )}
        {change !== undefined && (
          <div className="flex items-center space-x-1 mt-2">
            {getTrendIcon()}
            <span className={`text-xs font-medium ${getChangeColor()}`}>
              {getChangeText()}
            </span>
            <span className="text-xs text-gray-600">vs mes anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 