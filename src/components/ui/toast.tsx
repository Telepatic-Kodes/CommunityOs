'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {toasts.map((toast, index) => (
        <ToastItem 
          key={toast.id} 
          toast={toast} 
          removeToast={removeToast}
          style={{ animationDelay: `${index * 0.1}s` }}
        />
      ))}
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  removeToast: (id: string) => void;
  style?: React.CSSProperties;
}

function ToastItem({ toast, removeToast, style }: ToastItemProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => removeToast(toast.id), 200);
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-error-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning-600" />;
      case 'info':
        return <Info className="h-5 w-5 text-primary-600" />;
      default:
        return null;
    }
  };

  const getStyles = () => {
    const baseStyles = 'flex items-start p-4 rounded-xl shadow-lg border transition-all duration-300 transform hover:shadow-xl hover:scale-[1.02]';
    
    switch (toast.type) {
      case 'success':
        return cn(baseStyles, 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-900 hover:from-green-100 hover:to-emerald-100');
      case 'error':
        return cn(baseStyles, 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200 text-red-900 hover:from-red-100 hover:to-rose-100');
      case 'warning':
        return cn(baseStyles, 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 text-yellow-900 hover:from-yellow-100 hover:to-amber-100');
      case 'info':
        return cn(baseStyles, 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-900 hover:from-blue-100 hover:to-indigo-100');
      default:
        return cn(baseStyles, 'bg-gradient-to-r from-white to-neutral-50 border-neutral-200 text-neutral-900 hover:from-neutral-50 hover:to-neutral-100');
    }
  };

  return (
    <div
      className={cn(
        getStyles(),
        isVisible 
          ? 'translate-x-0 opacity-100' 
          : 'translate-x-full opacity-0'
      )}
      style={{ minWidth: '320px', maxWidth: '400px', ...style }}
    >
      <div className="flex-shrink-0 mr-3 mt-0.5">
        <div className="p-1 rounded-lg bg-white/50 backdrop-blur-sm">
          {getIcon()}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm">{toast.title}</div>
        {toast.message && (
          <div className="mt-1 text-sm opacity-90 font-medium">{toast.message}</div>
        )}
      </div>
      <button
        onClick={handleRemove}
        className="flex-shrink-0 ml-3 p-1.5 rounded-lg hover:bg-black/10 transition-all duration-200 hover:scale-110"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// Hook helper para crear toasts fácilmente
export function useToastHelpers() {
  const { addToast } = useToast();

  return {
    success: (title: string, message?: string) => 
      addToast({ type: 'success', title, message }),
    error: (title: string, message?: string) => 
      addToast({ type: 'error', title, message }),
    warning: (title: string, message?: string) => 
      addToast({ type: 'warning', title, message }),
    info: (title: string, message?: string) => 
      addToast({ type: 'info', title, message }),
  };
} 