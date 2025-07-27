'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    fill?: boolean;
  }[];
}

interface AdvancedChartsProps {
  memberGrowthData: ChartData;
  revenueData: ChartData;
  engagementData: ChartData;
  eventTypeData: ChartData;
}

export function MemberGrowthChart({ data }: { data: ChartData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Crecimiento de Miembros',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}

export function RevenueChart({ data }: { data: ChartData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Ingresos Mensuales',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: function(value: any) {
            return new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value);
          },
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export function EngagementChart({ data }: { data: ChartData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Métricas de Engagement',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: function(value: any) {
            return value + '%';
          },
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}

export function EventTypeChart({ data }: { data: ChartData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Distribución por Tipo de Evento',
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}

export function MemberSegmentChart({ data }: { data: ChartData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Segmentación de Miembros',
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}

// Componente principal que exporta todos los gráficos
export default function AdvancedCharts({ 
  memberGrowthData, 
  revenueData, 
  engagementData, 
  eventTypeData 
}: AdvancedChartsProps) {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <MemberGrowthChart data={memberGrowthData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <RevenueChart data={revenueData} />
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <EngagementChart data={engagementData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <EventTypeChart data={eventTypeData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <MemberSegmentChart data={eventTypeData} />
        </div>
      </div>
    </div>
  );
} 