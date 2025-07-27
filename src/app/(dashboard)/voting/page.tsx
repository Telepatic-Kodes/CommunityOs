'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Vote, 
  Users, 
  Clock, 
  CheckCircle,
  XCircle,
  Plus,
  BarChart3
} from 'lucide-react';
import { useConfig } from '@/hooks/useConfig';

interface Voting {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'closed' | 'draft' | 'cancelled';
  startDate: string;
  endDate: string;
  totalVotes: number;
  totalParticipants: number;
  participationRate: number;
  options: string[];
}

// Datos mock para la demo
const MOCK_VOTINGS: Voting[] = [
  {
    id: '1',
    title: 'Elección del Nuevo Presidente',
    description: 'Votación para elegir al nuevo presidente de la organización',
    status: 'active',
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-01-25T23:59:59Z',
    totalVotes: 156,
    totalParticipants: 200,
    participationRate: 78,
    options: ['Juan Pérez', 'María González', 'Carlos Rodríguez']
  },
  {
    id: '2',
    title: 'Aprobación del Nuevo Estatuto',
    description: 'Votación para aprobar las modificaciones al estatuto de la organización',
    status: 'closed',
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-01-10T23:59:59Z',
    totalVotes: 189,
    totalParticipants: 200,
    participationRate: 94.5,
    options: ['Aprobar', 'Rechazar', 'Abstención']
  },
  {
    id: '3',
    title: 'Selección del Tema del Próximo Evento',
    description: 'Votación para elegir el tema del próximo evento anual',
    status: 'active',
    startDate: '2024-01-20T00:00:00Z',
    endDate: '2024-01-30T23:59:59Z',
    totalVotes: 89,
    totalParticipants: 200,
    participationRate: 44.5,
    options: ['Innovación Tecnológica', 'Sostenibilidad', 'Liderazgo Digital', 'Emprendimiento']
  },
  {
    id: '4',
    title: 'Aprobación del Presupuesto 2024',
    description: 'Votación para aprobar el presupuesto anual de la organización',
    status: 'draft',
    startDate: '2024-02-01T00:00:00Z',
    endDate: '2024-02-15T23:59:59Z',
    totalVotes: 0,
    totalParticipants: 200,
    participationRate: 0,
    options: ['Aprobar', 'Rechazar', 'Modificar']
  }
];

const MOCK_STATS = {
  total: 8,
  active: 3,
  closed: 5,
  draft: 2,
  cancelled: 0,
  upcoming: 1,
  averageParticipation: 78
};

export default function VotingPage() {
  const { config } = useConfig();
  const [loading, setLoading] = useState(true);
  const [votings, setVotings] = useState<Voting[]>(MOCK_VOTINGS);
  const [stats, setStats] = useState(MOCK_STATS);

  // Simular carga de datos
  useEffect(() => {
    const loadVotings = async () => {
      try {
        setLoading(true);
        // Simular delay de carga
        await new Promise(resolve => setTimeout(resolve, 1000));
        setVotings(MOCK_VOTINGS);
        setStats(MOCK_STATS);
      } catch (error) {
        console.error('Error loading votings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVotings();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Activa</Badge>;
      case 'closed':
        return <Badge className="bg-gray-100 text-gray-800">Cerrada</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-800">Borrador</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sistema de Votaciones</h1>
          <p className="text-gray-600">Administra las votaciones y elecciones</p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Votación
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Vote className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Activas</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Cerradas</p>
                <p className="text-2xl font-bold">{stats.closed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Participación</p>
                <p className="text-2xl font-bold">{stats.averageParticipation}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Votings List */}
      <Card>
        <CardHeader>
          <CardTitle>Votaciones</CardTitle>
          <CardDescription>
            Lista de todas las votaciones disponibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {votings.map((voting) => (
              <div key={voting.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Vote className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{voting.title}</h3>
                    <p className="text-sm text-gray-500">{voting.description}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">
                        {formatDate(voting.startDate)} - {formatDate(voting.endDate)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {voting.totalVotes} votos de {voting.totalParticipants} participantes
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{voting.participationRate}% participación</p>
                  </div>
                  {getStatusBadge(voting.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Demo Notice */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 text-yellow-600">⚠️</div>
            <p className="text-sm text-yellow-800">
              <strong>Demo Mode:</strong> Esta es una versión de demostración con datos simulados. 
              En producción, estos datos vendrían de la base de datos real.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 