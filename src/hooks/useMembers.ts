'use client';

import { useState, useEffect } from 'react';
import { 
  Member, 
  CreateMemberData, 
  UpdateMemberData,
  getMembers,
  createMember,
  updateMember,
  deleteMember,
  searchMembers,
  getMemberStats
} from '@/lib/members';

// Datos de ejemplo para testing
const mockMembers: Member[] = [
  {
    id: '1',
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@asech.cl',
    phone: '+56912345678',
    role: 'admin',
    status: 'active',
    joinedAt: '2024-01-15T10:30:00Z',
    lastActive: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    firstName: 'María',
    lastName: 'González',
    email: 'maria.gonzalez@asech.cl',
    phone: '+56987654321',
    role: 'member',
    status: 'active',
    joinedAt: '2024-02-20T14:15:00Z',
    lastActive: '2024-02-20T14:15:00Z'
  },
  {
    id: '3',
    firstName: 'Carlos',
    lastName: 'Rodríguez',
    email: 'carlos.rodriguez@asech.cl',
    phone: '+56911223344',
    role: 'viewer',
    status: 'pending',
    joinedAt: '2024-03-10T09:45:00Z',
    lastActive: '2024-03-10T09:45:00Z'
  },
  {
    id: '4',
    firstName: 'Ana',
    lastName: 'Martínez',
    email: 'ana.martinez@asech.cl',
    phone: '+56955667788',
    role: 'member',
    status: 'inactive',
    joinedAt: '2024-01-05T16:20:00Z',
    lastActive: '2024-01-05T16:20:00Z'
  }
];

export function useMembers(organizationId: string) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    inactive: 0,
    admins: 0,
    members: 0,
    viewers: 0,
  });

  // Cargar miembros
  const loadMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Usar datos de ejemplo por ahora
      setMembers(mockMembers);
      
      // Calcular estadísticas
      const memberStats = {
        total: mockMembers.length,
        active: mockMembers.filter(m => m.status === 'active').length,
        pending: mockMembers.filter(m => m.status === 'pending').length,
        inactive: mockMembers.filter(m => m.status === 'inactive').length,
        admins: mockMembers.filter(m => m.role === 'admin').length,
        members: mockMembers.filter(m => m.role === 'member').length,
        viewers: mockMembers.filter(m => m.role === 'viewer').length,
      };
      setStats(memberStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar miembros');
    } finally {
      setLoading(false);
    }
  };

  // Crear miembro
  const addMember = async (memberData: CreateMemberData) => {
    try {
      setError(null);
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newMember: Member = {
        id: Date.now().toString(),
        ...memberData,
        role: memberData.role || 'member',
        status: memberData.status || 'pending',
        joinedAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };
      
      setMembers(prev => [newMember, ...prev]);
      
      // Actualizar estadísticas
      const updatedMembers = [newMember, ...members];
      const memberStats = {
        total: updatedMembers.length,
        active: updatedMembers.filter(m => m.status === 'active').length,
        pending: updatedMembers.filter(m => m.status === 'pending').length,
        inactive: updatedMembers.filter(m => m.status === 'inactive').length,
        admins: updatedMembers.filter(m => m.role === 'admin').length,
        members: updatedMembers.filter(m => m.role === 'member').length,
        viewers: updatedMembers.filter(m => m.role === 'viewer').length,
      };
      setStats(memberStats);
      
      return newMember;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear miembro');
      throw err;
    }
  };

  // Actualizar miembro
  const editMember = async (id: string, memberData: UpdateMemberData) => {
    try {
      setError(null);
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedMember = members.find(m => m.id === id);
      if (!updatedMember) throw new Error('Miembro no encontrado');
      
      const newMemberData: Member = {
        ...updatedMember,
        ...memberData,
        lastActive: new Date().toISOString()
      };
      
      setMembers(prev => 
        prev.map(member => 
          member.id === id ? newMemberData : member
        )
      );
      
      // Actualizar estadísticas
      const updatedMembers = members.map(m => m.id === id ? newMemberData : m);
      const memberStats = {
        total: updatedMembers.length,
        active: updatedMembers.filter(m => m.status === 'active').length,
        pending: updatedMembers.filter(m => m.status === 'pending').length,
        inactive: updatedMembers.filter(m => m.status === 'inactive').length,
        admins: updatedMembers.filter(m => m.role === 'admin').length,
        members: updatedMembers.filter(m => m.role === 'member').length,
        viewers: updatedMembers.filter(m => m.role === 'viewer').length,
      };
      setStats(memberStats);
      
      return newMemberData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar miembro');
      throw err;
    }
  };

  // Eliminar miembro
  const removeMember = async (id: string) => {
    try {
      setError(null);
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setMembers(prev => prev.filter(member => member.id !== id));
      
      // Actualizar estadísticas
      const updatedMembers = members.filter(m => m.id !== id);
      const memberStats = {
        total: updatedMembers.length,
        active: updatedMembers.filter(m => m.status === 'active').length,
        pending: updatedMembers.filter(m => m.status === 'pending').length,
        inactive: updatedMembers.filter(m => m.status === 'inactive').length,
        admins: updatedMembers.filter(m => m.role === 'admin').length,
        members: updatedMembers.filter(m => m.role === 'member').length,
        viewers: updatedMembers.filter(m => m.role === 'viewer').length,
      };
      setStats(memberStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar miembro');
      throw err;
    }
  };

  // Buscar miembros
  const search = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const results = members.filter(member =>
        member.firstName.toLowerCase().includes(query.toLowerCase()) ||
        member.lastName.toLowerCase().includes(query.toLowerCase()) ||
        member.email.toLowerCase().includes(query.toLowerCase())
      );
      
      setMembers(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar miembros');
    } finally {
      setLoading(false);
    }
  };

  // Filtrar por estado
  const filterByStatus = (status: 'active' | 'inactive' | 'pending') => {
    return members.filter(member => member.status === status);
  };

  // Filtrar por rol
  const filterByRole = (role: 'admin' | 'member' | 'viewer') => {
    return members.filter(member => member.role === role);
  };

  // Cargar miembros al montar el componente
  useEffect(() => {
    if (organizationId) {
      loadMembers();
    }
  }, [organizationId]);

  return {
    members,
    loading,
    error,
    stats,
    addMember,
    editMember,
    removeMember,
    search,
    filterByStatus,
    filterByRole,
    loadMembers,
  };
} 