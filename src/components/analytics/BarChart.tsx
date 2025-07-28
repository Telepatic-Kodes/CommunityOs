import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  title: string;
  description?: string;
  data: Array<{ name: string; value: number; [key: string]: string | number }>;
  dataKey: string;
  color?: string;
  height?: number;
}

export function BarChart({ 
  title, 
  description, 
  data, 
  dataKey, 
  color = "#000000",
  height = 300 
}: BarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsBarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              stroke="#4b5563" // MEJORADO: Mejor contraste que #666666
              fontSize={12}
            />
            <YAxis 
              stroke="#4b5563" // MEJORADO: Mejor contraste que #666666
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '2px solid #e5e7eb', // MEJORADO: Borde más visible
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar 
              dataKey={dataKey} 
              fill={color}
              radius={[4, 4, 0, 0]}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 