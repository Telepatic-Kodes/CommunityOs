import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Calendar, User, X } from "lucide-react";

interface Payment {
  id?: string;
  member_name: string;
  member_email: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: string;
  description: string;
  due_date: string;
  paid_date?: string;
}

interface PaymentFormProps {
  payment?: Payment;
  onSubmit: (payment: Payment) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function PaymentForm({ payment, onSubmit, onCancel, loading = false }: PaymentFormProps) {
  const [formData, setFormData] = useState<Payment>({
    member_name: payment?.member_name || '',
    member_email: payment?.member_email || '',
    amount: payment?.amount || 0,
    currency: payment?.currency || 'CLP',
    status: payment?.status || 'pending',
    payment_method: payment?.payment_method || 'transfer',
    description: payment?.description || '',
    due_date: payment?.due_date || new Date().toISOString().split('T')[0],
    paid_date: payment?.paid_date || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof Payment, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5" />
          <CardTitle>{payment ? 'Editar Pago' : 'Crear Pago'}</CardTitle>
        </div>
        <CardDescription>
          {payment ? 'Actualiza la información del pago' : 'Crea un nuevo pago o cuota'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Cuota mensual - Enero 2024"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="member_name">Nombre del Miembro</Label>
              <Input
                id="member_name"
                value={formData.member_name}
                onChange={(e) => handleChange('member_name', e.target.value)}
                placeholder="Juan Pérez"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="member_email">Email</Label>
              <Input
                id="member_email"
                type="email"
                value={formData.member_email}
                onChange={(e) => handleChange('member_email', e.target.value)}
                placeholder="juan@email.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Monto</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
                  placeholder="50000"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Moneda</Label>
              <Select value={formData.currency} onValueChange={(value) => handleChange('currency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CLP">CLP - Peso Chileno</SelectItem>
                  <SelectItem value="USD">USD - Dólar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="due_date">Fecha de Vencimiento</Label>
              <Input
                id="due_date"
                type="date"
                value={formData.due_date}
                onChange={(e) => handleChange('due_date', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment_method">Método de Pago</Label>
              <Select value={formData.payment_method} onValueChange={(value) => handleChange('payment_method', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transfer">Transferencia</SelectItem>
                  <SelectItem value="card">Tarjeta de Crédito</SelectItem>
                  <SelectItem value="cash">Efectivo</SelectItem>
                  <SelectItem value="check">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
                <SelectItem value="failed">Fallido</SelectItem>
                <SelectItem value="refunded">Reembolsado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.status === 'completed' && (
            <div className="space-y-2">
              <Label htmlFor="paid_date">Fecha de Pago</Label>
              <Input
                id="paid_date"
                type="date"
                value={formData.paid_date}
                onChange={(e) => handleChange('paid_date', e.target.value)}
              />
            </div>
          )}

          <div className="flex space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="flex-1"
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={loading}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              {loading ? 'Guardando...' : (payment ? 'Actualizar' : 'Crear')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 