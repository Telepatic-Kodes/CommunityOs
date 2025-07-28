import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, MoreHorizontal } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  capacity: number;
  registered_count: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  event_type: 'meeting' | 'workshop' | 'conference' | 'social' | 'training';
  price: number;
  currency: string;
  created_at: string;
}

interface EventCardProps {
  event: Event;
  onView?: (event: Event) => void;
  onEdit?: (event: Event) => void;
  onDelete?: (eventId: string) => void;
  onRegister?: (eventId: string) => void;
}

export function EventCard({ event, onView, onEdit, onDelete, onRegister }: EventCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Próximo';
      case 'ongoing': return 'En Curso';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-purple-100 text-purple-800';
      case 'workshop': return 'bg-orange-100 text-orange-800';
      case 'conference': return 'bg-indigo-100 text-indigo-800';
      case 'social': return 'bg-pink-100 text-pink-800';
      case 'training': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeText = (type: string) => {
    switch (type) {
      case 'meeting': return 'Reunión';
      case 'workshop': return 'Taller';
      case 'conference': return 'Conferencia';
      case 'social': return 'Social';
      case 'training': return 'Capacitación';
      default: return type;
    }
  };

  const isFull = event.registered_count >= event.capacity;
  const isUpcoming = event.status === 'upcoming';
  const canRegister = isUpcoming && !isFull;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {event.description}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <Badge className={getStatusColor(event.status)}>
              {getStatusText(event.status)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-4 w-4 text-neutral-600" />
          <span className="text-gray-600">
            {formatDate(event.start_date)} - {formatDate(event.end_date)}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="h-4 w-4 text-neutral-600" />
          <span className="text-gray-600">{event.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-neutral-600" />
            <span className="text-sm text-gray-600">
              {event.registered_count}/{event.capacity} inscritos
            </span>
          </div>
          <Badge className={getEventTypeColor(event.event_type)}>
            {getEventTypeText(event.event_type)}
          </Badge>
        </div>

        {event.price > 0 && (
          <div className="text-sm font-medium text-gray-900">
            Precio: ${event.price} {event.currency}
          </div>
        )}

        {isFull && isUpcoming && (
          <div className="bg-yellow-100 border border-yellow-200 rounded-md p-2">
            <p className="text-yellow-800 text-sm font-medium">
              ⚠️ Evento completo
            </p>
          </div>
        )}

        <div className="flex space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onView?.(event)}
          >
            Ver Detalles
          </Button>
          {canRegister && (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => onRegister?.(event.id)}
            >
              Inscribirse
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onEdit?.(event)}
          >
            Editar
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onDelete?.(event.id)}
          >
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 