import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, DollarSign, Vote, Users, X } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  category: 'payment' | 'event' | 'voting' | 'member' | 'general';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationCard({ notification, onMarkAsRead, onDelete }: NotificationCardProps) {
  const getIcon = () => {
    switch (notification.category) {
      case 'payment':
        return <DollarSign className="h-4 w-4" />;
      case 'event':
        return <Calendar className="h-4 w-4" />;
      case 'voting':
        return <Vote className="h-4 w-4" />;
      case 'member':
        return <Users className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getTypeBadge = () => {
    switch (notification.type) {
      case 'success':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Éxito</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Advertencia</Badge>;
      case 'error':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Error</Badge>;
      default:
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Info</Badge>;
    }
  };

  return (
    <Card className={`transition-all duration-200 ${!notification.isRead ? 'border-l-4 border-l-black bg-gray-50' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className={`p-2 rounded-full ${getTypeColor()} mt-1`}>
              {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className={`font-medium ${!notification.isRead ? 'text-black' : 'text-gray-700'}`}>
                  {notification.title}
                </h4>
                {getTypeBadge()}
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {new Date(notification.createdAt).toLocaleDateString('es-CL', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
                <div className="flex items-center space-x-2">
                  {notification.actionUrl && (
                    <Button size="sm" variant="outline" className="text-xs">
                      Ver Detalles
                    </Button>
                  )}
                  {!notification.isRead && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => onMarkAsRead(notification.id)}
                      className="text-xs"
                    >
                      Marcar como leída
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(notification.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 