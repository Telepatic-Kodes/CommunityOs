/**
 * Hook mejorado para gestión de eventos
 * Incluye validación, manejo de errores y tipos estrictos
 */

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Event, 
  CreateEventData, 
  UpdateEventData,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  searchEvents,
  getEventsByStatus,
  getUpcomingEvents,
  getEventStats
} from '@/lib/events';
import { sanitizeObject } from '@/lib/security';

// ============================================================================
// TIPOS Y INTERFACES
// ============================================================================

/**
 * Estado del hook
 */
interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
  stats: EventStats;
}

/**
 * Estadísticas de eventos
 */
interface EventStats {
  total: number;
  draft: number;
  published: number;
  cancelled: number;
  upcoming: number;
  past: number;
}

/**
 * Opciones de filtrado
 */
interface FilterOptions {
  status?: 'draft' | 'published' | 'cancelled';
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
}

/**
 * Opciones de ordenamiento
 */
interface SortOptions {
  field: 'title' | 'start_date' | 'created_at';
  direction: 'asc' | 'desc';
}

// ============================================================================
// VALIDACIONES
// ============================================================================

/**
 * Valida datos de creación de evento
 */
function validateCreateEventData(data: CreateEventData): CreateEventData {
  // Validaciones básicas
  if (!data.title || data.title.length < 3) {
    throw new Error('El título debe tener al menos 3 caracteres');
  }
  
  if (!data.description || data.description.length < 10) {
    throw new Error('La descripción debe tener al menos 10 caracteres');
  }
  
  if (!data.start_date) {
    throw new Error('La fecha de inicio es requerida');
  }
  
  if (!data.location || data.location.length < 3) {
    throw new Error('La ubicación debe tener al menos 3 caracteres');
  }
  
  if (!data.max_participants || data.max_participants < 1) {
    throw new Error('Debe permitir al menos 1 participante');
  }
  
  return data;
}

/**
 * Valida datos de actualización de evento
 */
function validateUpdateEventData(data: UpdateEventData): UpdateEventData {
  // Validaciones opcionales
  if (data.title !== undefined && data.title.length < 3) {
    throw new Error('El título debe tener al menos 3 caracteres');
  }
  
  if (data.description !== undefined && data.description.length < 10) {
    throw new Error('La descripción debe tener al menos 10 caracteres');
  }
  
  if (data.location !== undefined && data.location.length < 3) {
    throw new Error('La ubicación debe tener al menos 3 caracteres');
  }
  
  if (data.max_participants !== undefined && data.max_participants < 1) {
    throw new Error('Debe permitir al menos 1 participante');
  }
  
  return data;
}

// ============================================================================
// HOOK PRINCIPAL
// ============================================================================

export function useEvents(organizationId: string) {
  // Estado principal
  const [state, setState] = useState<EventsState>({
    events: [],
    loading: true,
    error: null,
    stats: {
      total: 0,
      draft: 0,
      published: 0,
      cancelled: 0,
      upcoming: 0,
      past: 0,
    },
  });

  // Estado de filtros y ordenamiento
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: 'start_date',
    direction: 'asc',
  });

  // ============================================================================
  // FUNCIONES DE CÁLCULO
  // ============================================================================

  /**
   * Calcula estadísticas de eventos
   */
  const calculateStats = useCallback((events: Event[]): EventStats => {
    const now = new Date();
    
    return {
      total: events.length,
      draft: events.filter(e => e.status === 'draft').length,
      published: events.filter(e => e.status === 'published').length,
      cancelled: events.filter(e => e.status === 'cancelled').length,
      upcoming: events.filter(e => 
        e.status === 'published' && new Date(e.start_date) > now
      ).length,
      past: events.filter(e => 
        new Date(e.start_date) < now
      ).length,
    };
  }, []);

  /**
   * Filtra y ordena eventos
   */
  const filterAndSortEvents = useCallback((events: Event[]): Event[] => {
    let filtered = [...events];

    // Aplicar filtros
    if (filters.status) {
      filtered = filtered.filter(event => event.status === filters.status);
    }

    if (filters.dateRange) {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.start_date);
        return eventDate >= filters.dateRange!.start && eventDate <= filters.dateRange!.end;
      });
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower)
      );
    }

    // Aplicar ordenamiento
    filtered.sort((a, b) => {
      const aValue = a[sortOptions.field];
      const bValue = b[sortOptions.field];
      
      if (sortOptions.direction === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [filters, sortOptions]);

  // ============================================================================
  // FUNCIONES DE OPERACIONES CRUD
  // ============================================================================

  /**
   * Carga eventos
   */
  const loadEvents = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const events = await getEvents(organizationId);
      const stats = calculateStats(events);
      
      setState(prev => ({
        ...prev,
        events,
        stats,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Error al cargar eventos',
        loading: false,
      }));
    }
  }, [organizationId, calculateStats]);

  /**
   * Crea un nuevo evento
   */
  const addEvent = useCallback(async (eventData: CreateEventData) => {
    setState(prev => ({ ...prev, error: null }));
    
    try {
      const validatedData = validateCreateEventData(eventData);
      const newEvent = await createEvent(organizationId, validatedData);
      
      setState(prev => {
        const updatedEvents = [newEvent, ...prev.events];
        const stats = calculateStats(updatedEvents);
        
        return {
          ...prev,
          events: updatedEvents,
          stats,
        };
      });
      
      return newEvent;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Error al crear evento',
      }));
      throw error;
    }
  }, [organizationId, calculateStats]);

  /**
   * Actualiza un evento existente
   */
  const editEvent = useCallback(async (id: string, eventData: UpdateEventData) => {
    setState(prev => ({ ...prev, error: null }));
    
    try {
      const validatedData = validateUpdateEventData(eventData);
      const updatedEvent = await updateEvent(id, validatedData);
      
      setState(prev => {
        const updatedEvents = prev.events.map(event => 
          event.id === id ? updatedEvent : event
        );
        const stats = calculateStats(updatedEvents);
        
        return {
          ...prev,
          events: updatedEvents,
          stats,
        };
      });
      
      return updatedEvent;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Error al actualizar evento',
      }));
      throw error;
    }
  }, [organizationId, calculateStats]);

  /**
   * Elimina un evento
   */
  const removeEvent = useCallback(async (id: string) => {
    setState(prev => ({ ...prev, error: null }));
    
    try {
      await deleteEvent(id);
      
      setState(prev => {
        const updatedEvents = prev.events.filter(event => event.id !== id);
        const stats = calculateStats(updatedEvents);
        
        return {
          ...prev,
          events: updatedEvents,
          stats,
        };
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Error al eliminar evento',
      }));
      throw error;
    }
  }, [organizationId, calculateStats]);

  /**
   * Busca eventos
   */
  const search = useCallback(async (query: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const results = await searchEvents(organizationId, query);
      const stats = calculateStats(results);
      
      setState(prev => ({
        ...prev,
        events: results,
        stats,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Error al buscar eventos',
        loading: false,
      }));
      throw error;
    }
  }, [organizationId, calculateStats]);

  // ============================================================================
  // FUNCIONES DE FILTRADO Y ORDENAMIENTO
  // ============================================================================

  /**
   * Aplica filtros
   */
  const applyFilters = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
  }, []);

  /**
   * Aplica ordenamiento
   */
  const applySorting = useCallback((newSortOptions: SortOptions) => {
    setSortOptions(newSortOptions);
  }, []);

  /**
   * Limpia filtros
   */
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  /**
   * Eventos filtrados y ordenados
   */
  const filteredEvents = useMemo(() => {
    return filterAndSortEvents(state.events);
  }, [state.events, filterAndSortEvents]);

  /**
   * Eventos próximos
   */
  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return state.events.filter(event => 
      event.status === 'published' && new Date(event.start_date) > now
    );
  }, [state.events]);

  /**
   * Eventos pasados
   */
  const pastEvents = useMemo(() => {
    const now = new Date();
    return state.events.filter(event => 
      new Date(event.start_date) < now
    );
  }, [state.events]);

  /**
   * Eventos por estado
   */
  const eventsByStatus = useMemo(() => ({
    draft: state.events.filter(e => e.status === 'draft'),
    published: state.events.filter(e => e.status === 'published'),
    cancelled: state.events.filter(e => e.status === 'cancelled'),
  }), [state.events]);

  // ============================================================================
  // EFFECTS
  // ============================================================================

  /**
   * Cargar eventos al montar el componente
   */
  useEffect(() => {
    if (organizationId) {
      loadEvents();
    }
  }, [organizationId, loadEvents]);

  // ============================================================================
  // RETORNO DEL HOOK
  // ============================================================================

  return {
    // Estado
    events: filteredEvents,
    loading: state.loading,
    error: state.error,
    stats: state.stats,
    
    // Operaciones CRUD
    addEvent,
    editEvent,
    removeEvent,
    search,
    loadEvents,
    
    // Filtros y ordenamiento
    filters,
    sortOptions,
    applyFilters,
    applySorting,
    clearFilters,
    
    // Computed values
    upcomingEvents,
    pastEvents,
    eventsByStatus,
    
    // Utilidades
    validateCreateEventData,
    validateUpdateEventData,
  };
} 