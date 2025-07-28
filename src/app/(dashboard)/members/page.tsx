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
  Trash2,
  TrendingUp,
  Award,
  Star
} from 'lucide-react';
import { useConfig } from '@/hooks/useConfig';

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

// Datos mock para la demo
const MOCK_MEMBERS: Member[] = [
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
    phone: '+56 9 5555 1234',
    role: 'member',
    status: 'pending',
    joinedAt: '2024-01-18',
    lastActive: '2024-01-18'
  },
  {
    id: '4',
    firstName: 'Ana',
    lastName: 'Silva',
    email: 'ana.silva@email.com',
    phone: '+56 9 9876 5432',
    role: 'viewer',
    status: 'active',
    joinedAt: '2024-01-05',
    lastActive: '2024-01-17'
  },
  {
    id: '5',
    firstName: 'Roberto',
    lastName: 'Martínez',
    email: 'roberto.martinez@email.com',
    phone: '+56 9 1111 2222',
    role: 'member',
    status: 'inactive',
    joinedAt: '2023-12-20',
    lastActive: '2024-01-10'
  },
  {
    id: '6',
    firstName: 'Patricia',
    lastName: 'López',
    email: 'patricia.lopez@email.com',
    phone: '+56 9 3333 4444',
    role: 'admin',
    status: 'active',
    joinedAt: '2024-01-12',
    lastActive: '2024-01-20'
  }
];

const MOCK_STATS = {
  total: 1247,
  active: 1189,
  pending: 23,
  inactive: 35,
  admins: 12,
  members: 1156,
  viewers: 79
};

export default function MembersPage() {
  const { config } = useConfig();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [stats, setStats] = useState(MOCK_STATS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  // Simular carga de datos
  useEffect(() => {
    const loadMembers = async () => {
      try {
        setLoading(true);
        // Simular delay de carga
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMembers(MOCK_MEMBERS);
        setStats(MOCK_STATS);
      } catch (error) {
        console.error('Error loading members:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, []);

  const handleAddMember = () => {
    setShowForm(true);
    setEditingMember(null);
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setShowForm(true);
  };

  const handleDeleteMember = async (memberId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este miembro?')) {
      setMembers(members.filter(m => m.id !== memberId));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" className="text-sm">Activo</Badge>;
      case 'pending':
        return <Badge variant="warning" className="text-sm">Pendiente</Badge>;
      case 'inactive':
        return <Badge variant="destructive" className="text-sm">Inactivo</Badge>;
      default:
        return <Badge variant="outline" className="text-sm">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-800 text-sm">Admin</Badge>;
      case 'member':
        return <Badge className="bg-blue-100 text-blue-800 text-sm">Miembro</Badge>;
      case 'viewer':
        return <Badge className="bg-gray-100 text-gray-800 text-sm">Viewer</Badge>;
      default:
        return <Badge variant="outline" className="text-sm">{role}</Badge>;
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-slide-in-bottom">
      {/* Header Editorial */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 animate-slide-in-top">
        <div className="space-y-4">
          <h1 className="text-5xl lg:text-6xl font-bold text-gradient tracking-tight">
            Gestión de Miembros
          </h1>
          <p className="text-xl text-neutral-700 max-w-3xl leading-relaxed font-serif">
            Administra los miembros de tu comunidad con herramientas profesionales y métricas detalladas.
          </p>
        </div>
        <Button onClick={handleAddMember} size="xl" variant="editorial" className="font-serif btn-modern glow hover-scale-modern">
          <Plus className="h-6 w-6 mr-3" />
          Agregar Miembro
        </Button>
      </div>

      {/* Breaking News Section */}
      <Card variant="editorial" className="bg-gradient-to-r from-neutral-50 to-neutral-100 border-neutral-200 card-modern animate-slide-in-bottom hover-scale-modern">
        <CardHeader className="pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-neutral-200 rounded-xl">
              <TrendingUp className="h-6 w-6 text-neutral-700" />
            </div>
            <div>
              <CardTitle className="text-2xl text-neutral-900 font-serif">Crecimiento de la Comunidad</CardTitle>
              <CardDescription className="text-neutral-700 font-medium font-serif">
                Nuevos miembros y estadísticas destacadas
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
              <div className="p-2 bg-neutral-200 rounded-lg">
                <Star className="h-5 w-5 text-neutral-700" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 mb-1 font-serif">Nuevo Miembro Destacado</h4>
                <p className="text-sm text-neutral-700 font-serif">María González ha sido reconocida como miembro del mes por su contribución excepcional.</p>
                <span className="text-xs text-neutral-600 mt-2 block font-serif">Hace 1 día</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
              <div className="p-2 bg-neutral-200 rounded-lg">
                <Award className="h-5 w-5 text-neutral-700" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 mb-1 font-serif">Récord de Participación</h4>
                <p className="text-sm text-neutral-700 font-serif">El 95% de los miembros activos participaron en el último evento comunitario.</p>
                <span className="text-xs text-neutral-600 mt-2 block font-serif">Hace 3 días</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
              <div className="p-2 bg-neutral-200 rounded-lg">
                <Users className="h-5 w-5 text-neutral-700" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 mb-1 font-serif">Crecimiento Sostenido</h4>
                <p className="text-sm text-neutral-700 font-serif">La comunidad ha crecido un 15% este mes, superando las expectativas.</p>
                <span className="text-xs text-neutral-600 mt-2 block font-serif">Hace 1 semana</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <Card variant="editorial" className="hover-lift">
          <CardContent className="p-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-base font-semibold text-neutral-600">Total</p>
                <p className="text-3xl font-bold text-neutral-900">{stats.total.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="editorial" className="hover-lift">
          <CardContent className="p-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-base font-semibold text-neutral-600">Activos</p>
                <p className="text-3xl font-bold text-neutral-900">{stats.active.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="editorial" className="hover-lift">
          <CardContent className="p-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <UserX className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-base font-semibold text-neutral-600">Pendientes</p>
                <p className="text-3xl font-bold text-neutral-900">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="editorial" className="hover-lift">
          <CardContent className="p-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-base font-semibold text-neutral-600">Admins</p>
                <p className="text-3xl font-bold text-neutral-900">{stats.admins}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="editorial">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-500" />
              <input
                type="text"
                placeholder="Buscar miembros..."
                className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 text-base font-serif transition-all duration-300"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="pending">Pendiente</option>
              <option value="inactive">Inactivo</option>
            </select>
            
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 text-base font-serif transition-all duration-300"
            >
              <option value="all">Todos los roles</option>
              <option value="admin">Admin</option>
              <option value="member">Miembro</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Members List */}
      <Card variant="editorial">
        <CardHeader>
          <CardTitle className="text-2xl">Miembros ({filteredMembers.length})</CardTitle>
          <CardDescription className="text-lg">
            Lista completa de miembros de la comunidad con información detallada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-6 border-2 border-neutral-200 rounded-xl hover:bg-neutral-50 transition-all duration-300">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">{member.firstName} {member.lastName}</h3>
                    <p className="text-base text-neutral-600 font-medium">{member.email}</p>
                    {member.phone && (
                      <p className="text-sm text-neutral-500 font-medium">{member.phone}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {getStatusBadge(member.status)}
                  {getRoleBadge(member.role)}
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => handleEditMember(member)}
                      className="hover:bg-neutral-100"
                    >
                      <Edit className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => handleDeleteMember(member.id)}
                      className="hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      <div className="text-center py-12">
        <Star className="h-12 w-12 text-neutral-500 mx-auto mb-6" />
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">No hay miembros registrados</h3>
        <p className="text-neutral-700">Los miembros aparecerán aquí cuando comiences a agregarlos</p>
      </div>

      {/* Cita Destacada */}
      <Card variant="editorial" className="bg-gradient-to-r from-neutral-50 to-neutral-100 border-neutral-300">
        <CardContent className="p-12 text-center">
          <div className="max-w-4xl mx-auto">
                            <Star className="h-12 w-12 text-neutral-500 mx-auto mb-6" />
            <blockquote className="text-3xl lg:text-4xl font-bold text-neutral-900 leading-relaxed mb-6">
              "Cada miembro es una pieza fundamental en el crecimiento y éxito de nuestra comunidad."
            </blockquote>
            <cite className="text-xl text-neutral-600 font-medium">
              — Patricia López, Administradora de Miembros
            </cite>
          </div>
        </CardContent>
      </Card>

      {/* Demo Notice */}
      <Card variant="editorial" className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-8">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 text-yellow-600 text-2xl">⚠️</div>
            <div>
              <h4 className="text-lg font-bold text-yellow-800 mb-2">Demo Mode</h4>
              <p className="text-base text-yellow-700 font-medium">
                Esta es una versión de demostración con datos simulados. 
                En producción, estos datos vendrían de la base de datos real.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 