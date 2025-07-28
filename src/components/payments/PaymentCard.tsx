import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calendar, User, Receipt, MoreHorizontal } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";

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

interface PaymentCardProps {
  payment: Payment;
  onView?: (payment: Payment) => void;
  onEdit?: (payment: Payment) => void;
  onDelete?: (paymentId: string) => void;
}

export function PaymentCard({ payment, onView, onEdit, onDelete }: PaymentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'pending': return 'Pendiente';
      case 'failed': return 'Fallido';
      case 'refunded': return 'Reembolsado';
      default: return status;
    }
  };

  const isOverdue = new Date(payment.due_date) < new Date() && payment.status === 'pending';

  return (
    <Card className={`hover:shadow-md transition-shadow ${isOverdue ? 'border-red-200 bg-red-50' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <CardTitle className="text-lg">
                {payment.description}
              </CardTitle>
              <CardDescription className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{payment.member_name}</span>
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-black">
              {formatCurrency(payment.amount)}
            </div>
            <Badge className={getStatusColor(payment.status)}>
              {getStatusText(payment.status)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-neutral-600" />
            <span className="text-gray-600">
              Vence: {formatDate(payment.due_date)}
            </span>
          </div>
          {payment.paid_date && (
            <span className="text-green-600">
              Pagado: {formatDate(payment.paid_date)}
            </span>
          )}
        </div>

        {isOverdue && (
          <div className="bg-red-100 border border-red-200 rounded-md p-2">
            <p className="text-red-800 text-sm font-medium">
              ⚠️ Pago vencido
            </p>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            {payment.payment_method}
          </Badge>
          <Badge variant="outline">
            {payment.currency}
          </Badge>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onView?.(payment)}
          >
            <Receipt className="h-4 w-4 mr-1" />
            Ver
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onEdit?.(payment)}
          >
            Editar
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onDelete?.(payment.id)}
          >
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 