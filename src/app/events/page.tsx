'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventCard } from "@/components/events/EventCard";
import { EventForm } from "@/components/events/EventForm";
import { Calendar, Plus, Search, Filter, Users, TrendingUp, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

// Datos de ejemplo para testing
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Reunión Mensual de Emprendedores',
    description: 'Reunión mensual para discutir temas de interés para la comunidad emprendedora de Santiago.',
    location: 'Santiago, Chile',
    start_date: '2024-02-15T18:00:00Z',
    end_date: '2024-02-15T20:00:00Z',
    capacity: 50,
    registered_count: 35,
    status: 'upcoming',
    event_type: 'meeting',
    price: 0,
    currency: 'CLP',
    created_at: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'Taller de Marketing Digital',
    description: 'Aprende las mejores estrategias de marketing digital para tu negocio.',
    location: 'Valparaíso, Chile',
    start_date: '2024-02-20T09:00:00Z',
    end_date: '2024-02-20T17:00:00Z',
    capacity: 30,
    registered_count: 30,
    status: 'upcoming',
    event_type: 'workshop',
    price: 25000,
    currency: 'CLP',
    created_at: '2024-01-20T00:00:00Z'
  },
  {
    id: '3',
    title: 'Conferencia de Innovación 2024',
    description: 'La conferencia más importante sobre innovación y tecnología en Latinoamérica.',
    location: 'Santiago, Chile',
    start_date: '2024-03-10T08:00:00Z',
    end_date: '2024-03-12T18:00:00Z',
    capacity: 200,
    registered_count: 150,
    status: 'upcoming',
    event_type: 'conference',
    price: 150000,
    currency: 'CLP',
    created_at: '2024-01-10T00:00:00Z'
  },
  {
    id: '4',
    title: 'Networking Social',
    description: 'Evento social para conectar con otros emprendedores de la comunidad.',
    location: 'Viña del Mar, Chile',
    start_date: '2024-01-25T19:00:00Z',
    end_date: '2024-01-25T23:00:00Z',
    capacity: 40,
    registered_count: 25,
    status: 'completed',
    event_type: 'social',
    price: 15000,
    currency: 'CLP',
    created_at: '2024-01-05T00:00:00Z'
  }
];

export default function EventsPage() {
  const [events, setEvents] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);

  // Filtrar eventos
  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesType = typeFilter === 'all' || event.event_type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Calcular estadísticas
  const stats = {
    total: events.length,
    upcoming: events.filter(e => e.status === 'upcoming').length,
    ongoing: events.filter(e => e.status === 'ongoing').length,
    completed: events.filter(e => e.status === 'completed').length,
    totalCapacity: events.reduce((sum, e) => sum + e.capacity, 0),
    totalRegistered: events.reduce((sum, e) => sum + e.registered_count, 0),
    averageAttendance: events.length > 0 ? Math.round(events.reduce((sum, e) => sum + e.registered_count, 0) / events.length) : 0
  };

  const handleAddEvent = async (eventData: Omit<Event, 'id' | 'created_at'>) => {
    setLoading(true);
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    
    setEvents(prev => [...prev, newEvent]);
    setShowForm(false);
    setLoading(false);
  };

  const handleEditEvent = async (eventData: Omit<Event, 'id' | 'created_at'>) => {
    setLoading(true);
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setEvents(prev => prev.map(event => 
      event.id === editingEvent?.id ? { ...event, ...eventData } : event
    ));
    
    setEditingEvent(null);
    setLoading(false);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      setLoading(true);
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setEvents(prev => prev.filter(event => event.id !== eventId));
      setLoading(false);
    }
  };

  const handleRegister = async (eventId: string) => {
    setLoading(true);
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, registered_count: event.registered_count + 1 }
        : event
    ));
    
    setLoading(false);
    alert('¡Te has inscrito exitosamente al evento!');
  };

  const handleSubmit = (eventData: Omit<Event, 'id' | 'created_at'>) => {
    if (editingEvent) {
      handleEditEvent(eventData);
    } else {
      handleAddEvent(eventData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-black">Portal de Eventos</h1>
              <span className="text-sm text-gray-500">ASECH - Asociación de Emprendedores</span>
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Crear Evento
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
              <CardTitle className="text-sm font-medium">Total Eventos</CardTitle>
              <Calendar className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-gray-600">
                {stats.upcoming} próximos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Capacidad Total</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCapacity}</div>
              <p className="text-xs text-gray-600">
                {stats.totalRegistered} inscritos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Promedio Asistencia</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageAttendance}</div>
              <p className="text-xs text-gray-600">
                por evento
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Curso</CardTitle>
              <Clock className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.ongoing}</div>
              <p className="text-xs text-gray-600">
                eventos activos
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
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="upcoming">Próximos</SelectItem>
                  <SelectItem value="ongoing">En Curso</SelectItem>
                  <SelectItem value="completed">Completados</SelectItem>
                  <SelectItem value="cancelled">Cancelados</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="meeting">Reuniones</SelectItem>
                  <SelectItem value="workshop">Talleres</SelectItem>
                  <SelectItem value="conference">Conferencias</SelectItem>
                  <SelectItem value="social">Sociales</SelectItem>
                  <SelectItem value="training">Capacitaciones</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Event Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <EventForm
              event={editingEvent || undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingEvent(null);
              }}
              loading={loading}
            />
          </div>
        )}

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={(event) => {
                setEditingEvent(event);
                setShowForm(true);
              }}
              onDelete={handleDeleteEvent}
              onRegister={handleRegister}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' ? 'No se encontraron eventos' : 'No hay eventos aún'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'Intenta con otros filtros de búsqueda'
                  : 'Comienza creando el primer evento para tu comunidad'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && typeFilter === 'all' && (
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Evento
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
} 