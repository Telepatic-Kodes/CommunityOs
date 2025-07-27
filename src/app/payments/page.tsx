'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DollarSign, 
  Plus, 
  Search, 
  Filter, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  CreditCard,
  Calendar,
  Users,
  FileText
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useConfig } from "@/hooks/useConfig";
import { 
  Payment, 
  getPayments, 
  getPaymentStats
} from "@/lib/payments";

// ID temporal de organización para testing
const TEMP_ORG_ID = "temp-org-id";

export default function PaymentsPage() {
  const { config } = useConfig();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    pendingAmount: 0,
    overdueAmount: 0,
    totalPayments: 0,
    completedPayments: 0,
    pendingPayments: 0,
    failedPayments: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Cargar datos
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [paymentsData, plansData, statsData] = await Promise.all([
          getPayments(TEMP_ORG_ID),
          getPaymentPlans(TEMP_ORG_ID),
          getPaymentStats(TEMP_ORG_ID)
        ]);
        
        setPayments(paymentsData);
        setPaymentPlans(plansData);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading payments data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filtrar pagos
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.payment_method.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Función para obtener el color del badge según el estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Función para obtener el nombre del plan
  const getPlanName = (planId: string) => {
    const plan = paymentPlans.find(p => p.id === planId);
    return plan?.name || 'Plan no encontrado';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-black">Gestión de Pagos</h1>
              <span className="text-sm text-gray-500">{config.organization.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Generar Reporte
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Pago
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(stats.totalRevenue, config.modules.payments.currency)}
              </div>
              <p className="text-xs text-gray-600">Todos los pagos completados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pagos Pendientes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {formatCurrency(stats.pendingAmount, config.modules.payments.currency)}
              </div>
              <p className="text-xs text-gray-600">{stats.pendingPayments} pagos pendientes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pagos Vencidos</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(stats.overdueAmount, config.modules.payments.currency)}
              </div>
              <p className="text-xs text-gray-600">Requieren atención inmediata</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa de Éxito</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.totalPayments > 0 
                  ? Math.round((stats.completedPayments / stats.totalPayments) * 100)
                  : 0}%
              </div>
              <p className="text-xs text-gray-600">Pagos completados exitosamente</p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Plans */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Planes de Pago
            </CardTitle>
            <CardDescription>
              Planes disponibles para los miembros de la organización
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {paymentPlans.map((plan) => (
                <div key={plan.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{plan.name}</h3>
                    <Badge variant="outline">{plan.interval}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                  <div className="text-2xl font-bold mb-3">
                    {formatCurrency(plan.amount, plan.currency)}
                    <span className="text-sm font-normal text-gray-500">
                      /{plan.interval === 'monthly' ? 'mes' : plan.interval === 'yearly' ? 'año' : 'único'}
                    </span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mb-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {plan.max_members && (
                    <p className="text-xs text-gray-500">
                      Máx. {plan.max_members} miembros
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar pagos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="completed">Completados</SelectItem>
                    <SelectItem value="pending">Pendientes</SelectItem>
                    <SelectItem value="failed">Fallidos</SelectItem>
                    <SelectItem value="refunded">Reembolsados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Historial de Pagos</CardTitle>
            <CardDescription>
              Lista de todos los pagos procesados en la organización
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">ID</th>
                    <th className="text-left py-3 px-4 font-medium">Plan</th>
                    <th className="text-left py-3 px-4 font-medium">Monto</th>
                    <th className="text-left py-3 px-4 font-medium">Método</th>
                    <th className="text-left py-3 px-4 font-medium">Estado</th>
                    <th className="text-left py-3 px-4 font-medium">Fecha Vencimiento</th>
                    <th className="text-left py-3 px-4 font-medium">Fecha Pago</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">{payment.id}</td>
                      <td className="py-3 px-4 text-sm">{getPlanName(payment.plan_id)}</td>
                      <td className="py-3 px-4 text-sm font-medium">
                        {formatCurrency(payment.amount, payment.currency)}
                      </td>
                      <td className="py-3 px-4 text-sm capitalize">{payment.payment_method}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status === 'completed' ? 'Completado' :
                           payment.status === 'pending' ? 'Pendiente' :
                           payment.status === 'failed' ? 'Fallido' : 'Reembolsado'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">{formatDate(payment.due_date)}</td>
                      <td className="py-3 px-4 text-sm">
                        {payment.paid_at ? formatDate(payment.paid_at) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPayments.length === 0 && (
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No se encontraron pagos' : 'No hay pagos registrados'}
                </h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? 'Intenta con otros términos de búsqueda'
                    : 'Los pagos aparecerán aquí cuando se procesen'
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 