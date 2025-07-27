'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Plus
} from 'lucide-react';
import { useConfig } from '@/hooks/useConfig';

interface Payment {
  id: string;
  memberName: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'overdue';
  paymentMethod: string;
  date: string;
  description: string;
}

// Datos mock para la demo
const MOCK_PAYMENTS: Payment[] = [
  {
    id: '1',
    memberName: 'Juan Pérez',
    amount: 50000,
    currency: 'CLP',
    status: 'completed',
    paymentMethod: 'Tarjeta de Crédito',
    date: '2024-01-20T10:30:00Z',
    description: 'Membresía Premium - Enero 2024'
  },
  {
    id: '2',
    memberName: 'María González',
    amount: 75000,
    currency: 'CLP',
    status: 'pending',
    paymentMethod: 'Transferencia Bancaria',
    date: '2024-01-19T14:15:00Z',
    description: 'Membresía Premium - Enero 2024'
  },
  {
    id: '3',
    memberName: 'Carlos Rodríguez',
    amount: 50000,
    currency: 'CLP',
    status: 'completed',
    paymentMethod: 'Débito Automático',
    date: '2024-01-18T09:45:00Z',
    description: 'Membresía Básica - Enero 2024'
  },
  {
    id: '4',
    memberName: 'Ana Silva',
    amount: 100000,
    currency: 'CLP',
    status: 'overdue',
    paymentMethod: 'Efectivo',
    date: '2024-01-15T16:20:00Z',
    description: 'Membresía Premium - Enero 2024'
  },
  {
    id: '5',
    memberName: 'Roberto Martínez',
    amount: 50000,
    currency: 'CLP',
    status: 'failed',
    paymentMethod: 'Tarjeta de Crédito',
    date: '2024-01-17T11:30:00Z',
    description: 'Membresía Básica - Enero 2024'
  }
];

const MOCK_STATS = {
  totalRevenue: 45678000,
  pendingAmount: 2340000,
  overdueAmount: 890000,
  totalPayments: 156,
  completedPayments: 142,
  pendingPayments: 14,
  failedPayments: 0
};

export default function PaymentsPage() {
  const { config } = useConfig();
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);
  const [stats, setStats] = useState(MOCK_STATS);

  // Simular carga de datos
  useEffect(() => {
    const loadPayments = async () => {
      try {
        setLoading(true);
        // Simular delay de carga
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPayments(MOCK_PAYMENTS);
        setStats(MOCK_STATS);
      } catch (error) {
        console.error('Error loading payments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completado</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Fallido</Badge>;
      case 'overdue':
        return <Badge className="bg-orange-100 text-orange-800">Vencido</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Pagos</h1>
          <p className="text-gray-600">Administra los pagos y membresías</p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Pago
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue, 'CLP')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.pendingAmount, 'CLP')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Vencidos</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.overdueAmount, 'CLP')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Completados</p>
                <p className="text-2xl font-bold">{stats.completedPayments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments List */}
      <Card>
        <CardHeader>
          <CardTitle>Pagos Recientes</CardTitle>
          <CardDescription>
            Lista de los últimos pagos procesados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{payment.memberName}</h3>
                    <p className="text-sm text-gray-500">{payment.description}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">{payment.paymentMethod}</span>
                      <span className="text-xs text-gray-500">{formatDate(payment.date)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(payment.amount, payment.currency)}</p>
                  </div>
                  {getStatusBadge(payment.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Demo Notice */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 text-yellow-600">⚠️</div>
            <p className="text-sm text-yellow-800">
              <strong>Demo Mode:</strong> Esta es una versión de demostración con datos simulados. 
              En producción, estos datos vendrían de la base de datos real.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 