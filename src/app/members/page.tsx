'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MemberCard } from "@/components/members/MemberCard";
import { MemberForm } from "@/components/members/MemberForm";
import { Users, Plus, Search, Filter } from "lucide-react";

interface Member {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
}

// Datos de ejemplo para testing
const mockMembers: Member[] = [
  {
    id: '1',
    first_name: 'Juan',
    last_name: 'Pérez',
    email: 'juan.perez@email.com',
    role: 'admin',
    status: 'active',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    first_name: 'María',
    last_name: 'González',
    email: 'maria.gonzalez@email.com',
    role: 'member',
    status: 'active',
    created_at: '2024-02-20T14:15:00Z'
  },
  {
    id: '3',
    first_name: 'Carlos',
    last_name: 'Rodríguez',
    email: 'carlos.rodriguez@email.com',
    role: 'viewer',
    status: 'pending',
    created_at: '2024-03-10T09:45:00Z'
  },
  {
    id: '4',
    first_name: 'Ana',
    last_name: 'Martínez',
    email: 'ana.martinez@email.com',
    role: 'member',
    status: 'inactive',
    created_at: '2024-01-05T16:20:00Z'
  }
];

export default function MembersPage() {
  const [members, setMembers] = useState(mockMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);

  // Filtrar miembros por búsqueda
  const filteredMembers = members.filter(member =>
    member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estadísticas
  const stats = {
    total: members.length,
    active: members.filter(m => m.status === 'active').length,
    pending: members.filter(m => m.status === 'pending').length,
    inactive: members.filter(m => m.status === 'inactive').length
  };

  const handleAddMember = async (memberData: Omit<typeof mockMembers[0], 'id' | 'created_at'>) => {
    setLoading(true);
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newMember = {
      ...memberData,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    
    setMembers(prev => [...prev, newMember]);
    setShowForm(false);
    setLoading(false);
  };

  const handleEditMember = async (memberData: Omit<typeof mockMembers[0], 'id' | 'created_at'>) => {
    setLoading(true);
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setMembers(prev => prev.map(member => 
      member.id === editingMember?.id ? { ...member, ...memberData } : member
    ));
    
    setEditingMember(null);
    setLoading(false);
  };

  const handleDeleteMember = async (memberId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este miembro?')) {
      setLoading(true);
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setMembers(prev => prev.filter(member => member.id !== memberId));
      setLoading(false);
    }
  };

  const handleSubmit = (memberData: Omit<Member, 'id' | 'created_at'>) => {
    if (editingMember) {
      handleEditMember(memberData);
    } else {
      handleAddMember(memberData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-black">Gestión de Miembros</h1>
              <span className="text-sm text-gray-500">ASECH - Asociación de Emprendedores</span>
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Miembro
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
              <CardTitle className="text-sm font-medium">Total Miembros</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activos</CardTitle>
              <div className="h-4 w-4 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <div className="h-4 w-4 bg-yellow-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactivos</CardTitle>
              <div className="h-4 w-4 bg-gray-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{stats.inactive}</div>
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
                  placeholder="Buscar miembros..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Members Grid */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <MemberForm
              member={editingMember || undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingMember(null);
              }}
              loading={loading}
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onEdit={(member) => {
                setEditingMember(member);
                setShowForm(true);
              }}
              onDelete={handleDeleteMember}
            />
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'No se encontraron miembros' : 'No hay miembros aún'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm 
                  ? 'Intenta con otros términos de búsqueda'
                  : 'Comienza agregando el primer miembro a tu organización'
                }
              </p>
              {!searchTerm && (
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Miembro
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
} 