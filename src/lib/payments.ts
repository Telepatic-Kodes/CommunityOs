import { supabase } from './supabase';

export interface Payment {
  id: string;
  organization_id: string;
  member_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  payment_method: string;
  description: string;
  due_date: string;
  paid_date?: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentStats {
  totalRevenue: number;
  pendingAmount: number;
  overdueAmount: number;
  totalPayments: number;
  completedPayments: number;
  pendingPayments: number;
  failedPayments: number;
}

// Obtener estadísticas de pagos
export async function getPaymentStats(organizationId: string): Promise<PaymentStats> {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('amount, status, due_date')
      .eq('organization_id', organizationId);

    if (error) {
      console.error('Error fetching payment stats:', error);
      return {
        totalRevenue: 0,
        pendingAmount: 0,
        overdueAmount: 0,
        totalPayments: 0,
        completedPayments: 0,
        pendingPayments: 0,
        failedPayments: 0
      };
    }

    const now = new Date();
    const stats: PaymentStats = {
      totalRevenue: 0,
      pendingAmount: 0,
      overdueAmount: 0,
      totalPayments: data?.length || 0,
      completedPayments: 0,
      pendingPayments: 0,
      failedPayments: 0
    };

    data?.forEach(payment => {
      switch (payment.status) {
        case 'completed':
          stats.completedPayments++;
          stats.totalRevenue += payment.amount;
          break;
        case 'pending':
          stats.pendingPayments++;
          stats.pendingAmount += payment.amount;
          if (new Date(payment.due_date) < now) {
            stats.overdueAmount += payment.amount;
          }
          break;
        case 'failed':
          stats.failedPayments++;
          break;
      }
    });

    return stats;
  } catch (error) {
    console.error('Error in getPaymentStats:', error);
    return {
      totalRevenue: 0,
      pendingAmount: 0,
      overdueAmount: 0,
      totalPayments: 0,
      completedPayments: 0,
      pendingPayments: 0,
      failedPayments: 0
    };
  }
}

// Obtener todos los pagos de una organización
export async function getPayments(organizationId: string): Promise<Payment[]> {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching payments:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getPayments:', error);
    return [];
  }
}

// Crear un nuevo pago
export async function createPayment(organizationId: string, paymentData: Omit<Payment, 'id' | 'organization_id' | 'created_at' | 'updated_at'>): Promise<Payment | null> {
  try {
    const { data, error } = await supabase
      .from('payments')
      .insert([{
        organization_id: organizationId,
        ...paymentData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating payment:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in createPayment:', error);
    return null;
  }
}

// Actualizar un pago
export async function updatePayment(paymentId: string, paymentData: Partial<Payment>): Promise<Payment | null> {
  try {
    const { data, error } = await supabase
      .from('payments')
      .update({
        ...paymentData,
        updated_at: new Date().toISOString()
      })
      .eq('id', paymentId)
      .select()
      .single();

    if (error) {
      console.error('Error updating payment:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in updatePayment:', error);
    return null;
  }
}

// Eliminar un pago
export async function deletePayment(paymentId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('payments')
      .delete()
      .eq('id', paymentId);

    if (error) {
      console.error('Error deleting payment:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deletePayment:', error);
    return false;
  }
} 