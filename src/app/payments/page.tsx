'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaymentCard } from "@/components/payments/PaymentCard";
import { PaymentForm } from "@/components/payments/PaymentForm";
import { DollarSign, Plus, Search, Filter, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Payment {
  id: string;
  member_name: string;
  member_email: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: string;
  description: string;
  due_date: string;
  paid_date?: string;
  created_at: string;
}

// Datos de ejemplo para testing
const mockPayments: Payment[] = [
  {
    id: '1',
    member_name: 'Juan Pérez',
    member_email: 'juan.perez@email.com',
    amount: 50000,
    currency: 'CLP',
    status: 'completed',
    payment_method: 'transfer',
    description: 'Cuota mensual - Enero 2024',
    due_date: '2024-01-31T00:00:00Z',
    paid_date: '2024-01-25T00:00:00Z',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    member_name: 'María González',
    member_email: 'maria.gonzalez@email.com',
    amount: 75000,
    currency: 'CLP',
    status: 'pending',
    payment_method: 'card',
    description: 'Cuota mensual - Febrero 2024',
    due_date: '2024-02-29T00:00:00Z',
    created_at: '2024-02-01T00:00:00Z'
  },
  {
    id: '3',
    member_name: 'Carlos Rodríguez',
    member_email: 'carlos.rodriguez@email.com',
    amount: 60000,
    currency: 'CLP',
    status: 'pending',
    payment_method: 'transfer',
    description: 'Cuota mensual - Enero 2024',
    due_date: '2024-01-31T00:00:00Z',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    member_name: 'Ana Martínez',
    member_email: 'ana.martinez@email.com',
    amount: 45000,
    currency: 'CLP',
    status: 'failed',
    payment_method: 'card',
    description: 'Cuota mensual - Diciembre 2023',
    due_date: '2023-12-31T00:00:00Z',
    created_at: '2023-12-01T00:00:00Z'
  }
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState(mockPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(false);

  // Filtrar pagos
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.member_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.member_email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calcular estadísticas
  const stats = {
    total: payments.length,
    completed: payments.filter(p => p.status === 'completed').length,
    pending: payments.filter(p => p.status === 'pending').length,
    failed: payments.filter(p => p.status === 'failed').length,
    totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
    completedAmount: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    pendingAmount: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    overdue: payments.filter(p => new Date(p.due_date) < new Date() && p.status === 'pending').length
  };

  const handleAddPayment = async (paymentData: Omit<Payment, 'id' | 'created_at'>) => {
    setLoading(true);
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPayment: Payment = {
      ...paymentData,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    
    setPayments(prev => [...prev, newPayment]);
    setShowForm(false);
    setLoading(false);
  };

  const handleEditPayment = async (paymentData: Omit<Payment, 'id' | 'created_at'>) => {
    setLoading(true);
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setPayments(prev => prev.map(payment => 
      payment.id === editingPayment?.id ? { ...payment, ...paymentData } : payment
    ));
    
    setEditingPayment(null);
    setLoading(false);
  };

  const handleDeletePayment = async (paymentId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este pago?')) {
      setLoading(true);
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPayments(prev => prev.filter(payment => payment.id !== paymentId));
      setLoading(false);
    }
  };

  const handleSubmit = (paymentData: Omit<Payment, 'id' | 'created_at'>) => {
    if (editingPayment) {
      handleEditPayment(paymentData);
    } else {
      handleAddPayment(paymentData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-black">Gestión de Pagos</h1>
              <span className="text-sm text-gray-500">ASECH - Asociación de Emprendedores</span>
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Crear Pago
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pagos</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-gray-600">
                {formatCurrency(stats.totalAmount)} total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completados</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <p className="text-xs text-gray-600">
                {formatCurrency(stats.completedAmount)} cobrado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <TrendingUp className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <p className="text-xs text-gray-600">
                {formatCurrency(stats.pendingAmount)} por cobrar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vencidos</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
              <p className="text-xs text-gray-600">
                Requieren atención
              </p>
            </CardContent>
          </Card>
        </div>

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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="completed">Completados</SelectItem>
                  <SelectItem value="failed">Fallidos</SelectItem>
                  <SelectItem value="refunded">Reembolsados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <PaymentForm
              payment={editingPayment || undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingPayment(null);
              }}
              loading={loading}
            />
          </div>
        )}

        {/* Payments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPayments.map((payment) => (
            <PaymentCard
              key={payment.id}
              payment={payment}
              onEdit={(payment) => {
                setEditingPayment(payment);
                setShowForm(true);
              }}
              onDelete={handleDeletePayment}
            />
          ))}
        </div>

        {filteredPayments.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || statusFilter !== 'all' ? 'No se encontraron pagos' : 'No hay pagos aún'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== 'all'
                  ? 'Intenta con otros filtros de búsqueda'
                  : 'Comienza creando el primer pago o cuota'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Pago
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
} 