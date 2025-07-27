'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  MapPin,
  Users,
  Clock,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { useConfig } from '@/hooks/useConfig';
import { getEvents, getEventStats } from '@/lib/events';
import { EventForm } from '@/components/events/EventForm';
import EventCard from '@/components/events/EventCard';

// ID temporal de organización para testing
const TEMP_ORG_ID = "temp-org-id";

interface Event {
  id: string;
  organization_id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  max_participants: number;
  status: 'draft' | 'published' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export default function EventsPage() {
  const { config } = useConfig();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    draft: 0,
    published: 0,
    cancelled: 0,
    upcoming: 0,
    past: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // Cargar eventos
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const [eventsData, statsData] = await Promise.all([
          getEvents(TEMP_ORG_ID),
          getEventStats(TEMP_ORG_ID)
        ]);

        setEvents(eventsData);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading events:', error);
        // Datos de ejemplo para testing
        setEvents([
          {
            id: '1',
            organization_id: TEMP_ORG_ID,
            title: 'Taller de Marketing Digital',
            description: 'Aprende las mejores estrategias de marketing digital para tu negocio',
            start_date: '2024-02-15T10:00:00Z',
            end_date: '2024-02-15T18:00:00Z',
            location: 'Santiago, Chile',
            max_participants: 50,
            status: 'published',
            created_at: '2024-01-15T00:00:00Z',
            updated_at: '2024-01-15T00:00:00Z'
          },
          {
            id: '2',
            organization_id: TEMP_ORG_ID,
            title: 'Networking Empresarial',
            description: 'Evento de networking para conectar con otros emprendedores',
            start_date: '2024-02-20T19:00:00Z',
            end_date: '2024-02-20T22:00:00Z',
            location: 'Valparaíso, Chile',
            max_participants: 100,
            status: 'published',
            created_at: '2024-01-20T00:00:00Z',
            updated_at: '2024-01-20T00:00:00Z'
          },
          {
            id: '3',
            organization_id: TEMP_ORG_ID,
            title: 'Conferencia de Innovación',
            description: 'Conferencia sobre las últimas tendencias en innovación tecnológica',
            start_date: '2024-03-10T09:00:00Z',
            end_date: '2024-03-10T17:00:00Z',
            location: 'Concepción, Chile',
            max_participants: 200,
            status: 'draft',
            created_at: '2024-01-25T00:00:00Z',
            updated_at: '2024-01-25T00:00:00Z'
          }
        ]);
        setStats({
          total: 3,
          draft: 1,
          published: 2,
          cancelled: 0,
          upcoming: 2,
          past: 0
        });
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      try {
        // TODO: Implementar eliminación real
        setEvents(prev => prev.filter(event => event.id !== eventId));
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800">Publicado</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800">Borrador</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Eventos</h1>
          <p className="text-gray-600">Gestiona los eventos de tu comunidad</p>
        </div>
        <Button onClick={handleAddEvent} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Evento
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Eventos</CardTitle>
            <Calendar className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publicados</CardTitle>
            <Eye className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.published}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximos</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.upcoming}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Borradores</CardTitle>
            <Edit className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.draft}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos los estados</option>
                <option value="published">Publicados</option>
                <option value="draft">Borradores</option>
                <option value="cancelled">Cancelados</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <div className="grid gap-6">
        {filteredEvents.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay eventos</h3>
              <p className="text-gray-600 text-center mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No se encontraron eventos con los filtros aplicados'
                  : 'Comienza creando tu primer evento'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button onClick={handleAddEvent}>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Evento
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      {getStatusBadge(event.status)}
                    </div>
                    <CardDescription className="text-base">
                      {event.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditEvent(event)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>
                      {new Date(event.start_date).toLocaleDateString('es-CL', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>Máx. {event.max_participants} participantes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Event Form Modal */}
      {showForm && (
        <EventForm
          event={editingEvent}
          onClose={() => {
            setShowForm(false);
            setEditingEvent(null);
          }}
          onSave={(savedEvent) => {
            if (editingEvent) {
              setEvents(prev => prev.map(event => 
                event.id === editingEvent.id ? savedEvent : event
              ));
            } else {
              setEvents(prev => [savedEvent, ...prev]);
            }
            setShowForm(false);
            setEditingEvent(null);
          }}
        />
      )}
    </div>
  );
} 