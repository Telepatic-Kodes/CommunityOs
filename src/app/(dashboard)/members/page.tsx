'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  UserCheck,
  UserX,
  Edit,
  Trash2
} from 'lucide-react';
import { useConfig } from '@/hooks/useConfig';
import { getMembers, getMemberStats } from '@/lib/members';
import MemberForm from '@/components/members/MemberForm';
import MemberCard from '@/components/members/MemberCard';

// ID temporal de organización para testing
const TEMP_ORG_ID = "temp-org-id";

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'admin' | 'member' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  joinedAt: string;
  lastActive?: string;
}

export default function MembersPage() {
  const { config } = useConfig();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    inactive: 0,
    admins: 0,
    members: 0,
    viewers: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  // Cargar miembros
  useEffect(() => {
    const loadMembers = async () => {
      try {
        setLoading(true);
        const [membersData, statsData] = await Promise.all([
          getMembers(TEMP_ORG_ID),
          getMemberStats(TEMP_ORG_ID)
        ]);

        setMembers(membersData);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading members:', error);
        // Datos de ejemplo para testing
        setMembers([
          {
            id: '1',
            firstName: 'Juan',
            lastName: 'Pérez',
            email: 'juan.perez@email.com',
            phone: '+56 9 1234 5678',
            role: 'admin',
            status: 'active',
            joinedAt: '2024-01-15',
            lastActive: '2024-01-20'
          },
          {
            id: '2',
            firstName: 'María',
            lastName: 'González',
            email: 'maria.gonzalez@email.com',
            phone: '+56 9 8765 4321',
            role: 'member',
            status: 'active',
            joinedAt: '2024-01-10',
            lastActive: '2024-01-19'
          },
          {
            id: '3',
            firstName: 'Carlos',
            lastName: 'Rodríguez',
            email: 'carlos.rodriguez@email.com',
            role: 'member',
            status: 'pending',
            joinedAt: '2024-01-18'
          }
        ]);
        setStats({
          total: 3,
          active: 2,
          pending: 1,
          inactive: 0,
          admins: 1,
          members: 2,
          viewers: 0
        });
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, []);

  // Filtrar miembros
  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleAddMember = () => {
    setEditingMember(null);
    setShowForm(true);
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setShowForm(true);
  };

  const handleDeleteMember = async (memberId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este miembro?')) {
      // Aquí iría la lógica para eliminar el miembro
      setMembers(members.filter(m => m.id !== memberId));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Activo</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800">Inactivo</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>;
      case 'member':
        return <Badge className="bg-blue-100 text-blue-800">Miembro</Badge>;
      case 'viewer':
        return <Badge className="bg-gray-100 text-gray-800">Viewer</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Miembros</h1>
          <p className="text-gray-600">Gestiona los miembros de tu comunidad</p>
        </div>
        <Button onClick={handleAddMember}>
          <Plus className="h-4 w-4 mr-2" />
          Agregar Miembro
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Miembros</CardTitle>
            <Users className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-gray-600">Miembros registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activos</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-xs text-gray-600">Miembros activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-gray-600">Aprobación pendiente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.admins}</div>
            <p className="text-xs text-gray-600">Administradores</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros y Búsqueda</CardTitle>
          <CardDescription>
            Encuentra miembros específicos usando los filtros
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar miembros..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="pending">Pendientes</option>
              <option value="inactive">Inactivos</option>
            </select>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              <option value="all">Todos los roles</option>
              <option value="admin">Administradores</option>
              <option value="member">Miembros</option>
              <option value="viewer">Viewers</option>
            </select>

            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Miembros ({filteredMembers.length})</CardTitle>
          <CardDescription>
            Gestiona los miembros de tu organización
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredMembers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron miembros</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== 'all' || roleFilter !== 'all' 
                  ? 'Intenta ajustar los filtros de búsqueda'
                  : 'Comienza agregando tu primer miembro'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && roleFilter === 'all' && (
                <Button onClick={handleAddMember}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Miembro
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {member.firstName[0]}{member.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {member.firstName} {member.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">{member.email}</p>
                      {member.phone && (
                        <p className="text-sm text-gray-500">{member.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(member.status)}
                    {getRoleBadge(member.role)}
                    
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditMember(member)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteMember(member.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Member Form Modal */}
      {showForm && (
        <MemberForm
          member={editingMember}
          onClose={() => {
            setShowForm(false);
            setEditingMember(null);
          }}
          onSave={(member) => {
            if (editingMember) {
              // Actualizar miembro existente
              setMembers(members.map(m => m.id === member.id ? member : m));
            } else {
              // Agregar nuevo miembro
              setMembers([...members, { ...member, id: Date.now().toString() }]);
            }
            setShowForm(false);
            setEditingMember(null);
          }}
        />
      )}
    </div>
  );
} 