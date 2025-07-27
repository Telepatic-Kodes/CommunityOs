'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { 
  Vote, 
  Plus, 
  Search, 
  Filter, 
  Users, 
  TrendingUp, 
  CheckCircle,
  Calendar,
  FileText,
  Shield,
  Clock,
  AlertTriangle
} from "lucide-react";
import { useConfig } from "@/hooks/useConfig";
import { 
  Voting, 
  getVotings, 
  getVotingStats,
  getVotingResults
} from "@/lib/voting";

// ID temporal de organización para testing
const TEMP_ORG_ID = "temp-org-id";

export default function VotingPage() {
  const { config } = useConfig();
  const [polls, setPolls] = useState<Voting[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    closed: 0,
    draft: 0,
    cancelled: 0,
    upcoming: 0,
    averageParticipation: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Cargar datos
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [pollsData, statsData] = await Promise.all([
          getVotings(TEMP_ORG_ID),
          getVotingStats(TEMP_ORG_ID)
        ]);
        
        setPolls(pollsData);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading voting data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filtrar votaciones
  const filteredPolls = polls.filter(poll => {
    const matchesSearch = 
      poll.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poll.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || poll.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Función para obtener el color del badge según el estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Función para obtener el texto del estado
  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activa';
      case 'draft': return 'Borrador';
      case 'closed': return 'Cerrada';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Función para verificar si una votación está activa
  const isPollActive = (poll: VotingPoll) => {
    const now = new Date();
    return poll.status === 'active' && 
           now >= new Date(poll.start_date) && 
           now <= new Date(poll.end_date);
  };

  // Función para generar acta
  const handleGenerateMinutes = async (pollId: string) => {
    try {
      const minutesUrl = await generateVotingMinutes(pollId);
      window.open(minutesUrl, '_blank');
    } catch (error) {
      console.error('Error generating minutes:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-black">Sistema de Votaciones</h1>
              <span className="text-sm text-gray-500">{config.organization.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Generar Acta
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Votación
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Votaciones</CardTitle>
              <Vote className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-gray-600">Todas las votaciones</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Votaciones Activas</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <p className="text-xs text-gray-600">En curso actualmente</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximas</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.upcoming}</div>
              <p className="text-xs text-gray-600">Programadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participación Promedio</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.averageParticipation}%</div>
              <p className="text-xs text-gray-600">De los miembros elegibles</p>
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
                  placeholder="Buscar votaciones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="active">Activas</SelectItem>
                    <SelectItem value="draft">Borradores</SelectItem>
                    <SelectItem value="closed">Cerradas</SelectItem>
                    <SelectItem value="cancelled">Canceladas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Voting Polls Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolls.map((poll) => (
            <Card key={poll.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold mb-2">
                      {poll.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getStatusColor(poll.status)}>
                        {getStatusText(poll.status)}
                      </Badge>
                      {isPollActive(poll) && (
                        <Badge className="bg-red-100 text-red-800">
                          <Clock className="h-3 w-3 mr-1" />
                          Activa
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm line-clamp-3">
                  {poll.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(poll.start_date)} - {formatDate(poll.end_date)}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Vote className="h-4 w-4 mr-2" />
                    {poll.voting_method === 'simple' ? 'Votación Simple' :
                     poll.voting_method === 'ranked' ? 'Votación Preferencial' : 'Votación por Aprobación'}
                  </div>
                  {poll.require_quorum && (
                    <div className="flex items-center text-gray-500">
                      <Shield className="h-4 w-4 mr-2" />
                      Quórum: {poll.quorum_percentage}%
                    </div>
                  )}
                  <div className="flex items-center text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    {poll.options.length} opciones
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  {poll.options.map((option) => (
                    <div key={option.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">{option.text}</span>
                      {option.description && (
                        <span className="text-xs text-gray-500 ml-2">
                          {option.description}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-4">
                  {poll.status === 'active' && (
                    <Button size="sm" className="flex-1">
                      <Vote className="h-4 w-4 mr-2" />
                      Votar
                    </Button>
                  )}
                  {poll.status === 'closed' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleGenerateMinutes(poll.id)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Ver Resultados
                    </Button>
                  )}
                  {poll.status === 'draft' && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Activar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPolls.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'No se encontraron votaciones' : 'No hay votaciones registradas'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm 
                  ? 'Intenta con otros términos de búsqueda'
                  : 'Las votaciones aparecerán aquí cuando se creen'
                }
              </p>
              {!searchTerm && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Votación
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
} 