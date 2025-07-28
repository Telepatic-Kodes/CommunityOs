import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LineChartProps {
  title: string;
  description?: string;
  data: Array<{ name: string; value: number; [key: string]: string | number }>;
  dataKey: string;
  color?: string;
  height?: number;
}

export function LineChart({ 
  title, 
  description, 
  data, 
  dataKey, 
  color = "#000000",
  height = 300 
}: LineChartProps) {
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
          <RechartsLineChart data={data}>
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
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 