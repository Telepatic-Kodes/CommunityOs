import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export interface Event {
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

export interface CreateEventData {
  title: string;
  description: string;
  start_date: string;
  end_date?: string;
  location: string;
  max_participants?: number;
  status?: 'draft' | 'published' | 'cancelled';
}

export interface UpdateEventData {
  title?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  max_participants?: number;
  status?: 'draft' | 'published' | 'cancelled';
}

export interface EventParticipant {
  id: string;
  event_id: string;
  member_id: string;
  status: 'registered' | 'attended' | 'cancelled';
  registered_at: string;
  attended_at?: string;
}

// Obtener todos los eventos de una organización
export async function getEvents(organizationId: string): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('organization_id', organizationId)
    .order('start_date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    throw new Error('Error al obtener eventos');
  }

  return data || [];
}

// Obtener un evento por ID
export async function getEvent(id: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching event:', error);
    throw new Error('Error al obtener evento');
  }

  return data;
}

// Crear un nuevo evento
export async function createEvent(organizationId: string, eventData: CreateEventData): Promise<Event> {
  const { data, error } = await supabase
    .from('events')
    .insert([
      {
        organization_id: organizationId,
        ...eventData,
        status: eventData.status || 'draft',
        max_participants: eventData.max_participants || 0
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating event:', error);
    throw new Error('Error al crear evento');
  }

  return data;
}

// Actualizar un evento
export async function updateEvent(id: string, eventData: UpdateEventData): Promise<Event> {
  const { data, error } = await supabase
    .from('events')
    .update(eventData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating event:', error);
    throw new Error('Error al actualizar evento');
  }

  return data;
}

// Eliminar un evento
export async function deleteEvent(id: string): Promise<void> {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting event:', error);
    throw new Error('Error al eliminar evento');
  }
}

// Buscar eventos por título o descripción
export async function searchEvents(organizationId: string, query: string): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('organization_id', organizationId)
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order('start_date', { ascending: true });

  if (error) {
    console.error('Error searching events:', error);
    throw new Error('Error al buscar eventos');
  }

  return data || [];
}

// Obtener eventos por estado
export async function getEventsByStatus(organizationId: string, status: 'draft' | 'published' | 'cancelled'): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('organization_id', organizationId)
    .eq('status', status)
    .order('start_date', { ascending: true });

  if (error) {
    console.error('Error fetching events by status:', error);
    throw new Error('Error al obtener eventos por estado');
  }

  return data || [];
}

// Obtener eventos próximos (próximos 30 días)
export async function getUpcomingEvents(organizationId: string): Promise<Event[]> {
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('organization_id', organizationId)
    .gte('start_date', new Date().toISOString())
    .lte('start_date', thirtyDaysFromNow.toISOString())
    .eq('status', 'published')
    .order('start_date', { ascending: true });

  if (error) {
    console.error('Error fetching upcoming events:', error);
    throw new Error('Error al obtener eventos próximos');
  }

  return data || [];
}

// Obtener estadísticas de eventos
export async function getEventStats(organizationId: string) {
  const { data, error } = await supabase
    .from('events')
    .select('status, start_date')
    .eq('organization_id', organizationId);

  if (error) {
    console.error('Error fetching event stats:', error);
    throw new Error('Error al obtener estadísticas de eventos');
  }

  const now = new Date();
  const stats = {
    total: data?.length || 0,
    draft: data?.filter(e => e.status === 'draft').length || 0,
    published: data?.filter(e => e.status === 'published').length || 0,
    cancelled: data?.filter(e => e.status === 'cancelled').length || 0,
    upcoming: data?.filter(e => 
      e.status === 'published' && new Date(e.start_date) > now
    ).length || 0,
    past: data?.filter(e => 
      new Date(e.start_date) < now
    ).length || 0,
  };

  return stats;
}

// Registrar participante en evento
export async function registerParticipant(eventId: string, memberId: string): Promise<EventParticipant> {
  const { data, error } = await supabase
    .from('event_participants')
    .insert([
      {
        event_id: eventId,
        member_id: memberId,
        status: 'registered',
        registered_at: new Date().toISOString()
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error registering participant:', error);
    throw new Error('Error al registrar participante');
  }

  return data;
}

// Obtener participantes de un evento
export async function getEventParticipants(eventId: string): Promise<EventParticipant[]> {
  const { data, error } = await supabase
    .from('event_participants')
    .select(`
      *,
      members (
        id,
        first_name,
        last_name,
        email
      )
    `)
    .eq('event_id', eventId)
    .order('registered_at', { ascending: true });

  if (error) {
    console.error('Error fetching event participants:', error);
    throw new Error('Error al obtener participantes');
  }

  return data || [];
} 