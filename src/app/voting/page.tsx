'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VotingCard } from "@/components/voting/VotingCard";
import { VotingForm } from "@/components/voting/VotingForm";
import { Vote, Plus, Search, Filter, Users, TrendingUp, CheckCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VotingOption {
  id: string;
  text: string;
  votes: number;
}

interface Voting {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  total_voters: number;
  current_votes: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  voting_type: 'single' | 'multiple' | 'ranked';
  options: VotingOption[];
  created_at: string;
}

// Datos de ejemplo para testing
const mockVotings: Voting[] = [
  {
    id: '1',
    title: '¿Deberíamos cambiar la fecha de la reunión mensual?',
    description: 'Votación para decidir si cambiamos la reunión mensual del tercer jueves al primer martes de cada mes.',
    start_date: '2024-02-01T00:00:00Z',
    end_date: '2024-02-15T23:59:59Z',
    total_voters: 50,
    current_votes: 35,
    status: 'active',
    voting_type: 'single',
    options: [
      { id: '1', text: 'Sí, cambiar al primer martes', votes: 20 },
      { id: '2', text: 'No, mantener el tercer jueves', votes: 15 },
      { id: '3', text: 'Me da igual', votes: 0 }
    ],
    created_at: '2024-01-25T00:00:00Z'
  },
  {
    id: '2',
    title: 'Selección de temas para el próximo taller',
    description: 'Votación múltiple para seleccionar los temas que más interesan a la comunidad para el próximo taller.',
    start_date: '2024-02-10T00:00:00Z',
    end_date: '2024-02-25T23:59:59Z',
    total_voters: 50,
    current_votes: 28,
    status: 'upcoming',
    voting_type: 'multiple',
    options: [
      { id: '1', text: 'Marketing Digital', votes: 0 },
      { id: '2', text: 'Financiamiento para Startups', votes: 0 },
      { id: '3', text: 'Legal para Emprendedores', votes: 0 },
      { id: '4', text: 'Networking y Pitch', votes: 0 },
      { id: '5', text: 'Gestión de Equipos', votes: 0 }
    ],
    created_at: '2024-02-05T00:00:00Z'
  },
  {
    id: '3',
    title: 'Elección del nuevo presidente de la asociación',
    description: 'Votación preferencial para elegir al nuevo presidente de la asociación para el período 2024-2025.',
    start_date: '2024-01-15T00:00:00Z',
    end_date: '2024-01-30T23:59:59Z',
    total_voters: 50,
    current_votes: 42,
    status: 'completed',
    voting_type: 'ranked',
    options: [
      { id: '1', text: 'María González', votes: 18 },
      { id: '2', text: 'Carlos Rodríguez', votes: 15 },
      { id: '3', text: 'Ana Martínez', votes: 9 }
    ],
    created_at: '2024-01-10T00:00:00Z'
  },
  {
    id: '4',
    title: 'Aprobación del presupuesto anual 2024',
    description: 'Votación para aprobar el presupuesto anual de la asociación para el año 2024.',
    start_date: '2024-01-20T00:00:00Z',
    end_date: '2024-02-05T23:59:59Z',
    total_voters: 50,
    current_votes: 38,
    status: 'completed',
    voting_type: 'single',
    options: [
      { id: '1', text: 'Aprobar presupuesto', votes: 32 },
      { id: '2', text: 'Rechazar presupuesto', votes: 6 }
    ],
    created_at: '2024-01-15T00:00:00Z'
  }
];

export default function VotingPage() {
  const [votings, setVotings] = useState(mockVotings);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingVoting, setEditingVoting] = useState<Voting | null>(null);
  const [loading, setLoading] = useState(false);
  const [userVotes, setUserVotes] = useState<Set<string>>(new Set(['3', '4'])); // Simular votos del usuario

  // Filtrar votaciones
  const filteredVotings = votings.filter(voting => {
    const matchesSearch = 
      voting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voting.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || voting.status === statusFilter;
    const matchesType = typeFilter === 'all' || voting.voting_type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Calcular estadísticas
  const stats = {
    total: votings.length,
    active: votings.filter(v => v.status === 'active').length,
    upcoming: votings.filter(v => v.status === 'upcoming').length,
    completed: votings.filter(v => v.status === 'completed').length,
    totalVoters: votings.reduce((sum, v) => sum + v.total_voters, 0),
    totalVotes: votings.reduce((sum, v) => sum + v.current_votes, 0),
    averageParticipation: votings.length > 0 ? Math.round(votings.reduce((sum, v) => sum + (v.current_votes / v.total_voters * 100), 0) / votings.length) : 0
  };

  const handleAddVoting = async (votingData: Omit<Voting, 'id' | 'created_at'>) => {
    setLoading(true);
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newVoting: Voting = {
      ...votingData,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    
    setVotings(prev => [...prev, newVoting]);
    setShowForm(false);
    setLoading(false);
  };

  const handleEditVoting = async (votingData: Omit<Voting, 'id' | 'created_at'>) => {
    setLoading(true);
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setVotings(prev => prev.map(voting => 
      voting.id === editingVoting?.id ? { ...voting, ...votingData } : voting
    ));
    
    setEditingVoting(null);
    setLoading(false);
  };

  const handleDeleteVoting = async (votingId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta votación?')) {
      setLoading(true);
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setVotings(prev => prev.filter(voting => voting.id !== votingId));
      setLoading(false);
    }
  };

  const handleVote = async (votingId: string) => {
    setLoading(true);
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setVotings(prev => prev.map(voting => 
      voting.id === votingId 
        ? { ...voting, current_votes: voting.current_votes + 1 }
        : voting
    ));
    
    setUserVotes(prev => new Set([...prev, votingId]));
    setLoading(false);
    alert('¡Tu voto ha sido registrado exitosamente!');
  };

  const handleSubmit = (votingData: Omit<Voting, 'id' | 'created_at'>) => {
    if (editingVoting) {
      handleEditVoting(votingData);
    } else {
      handleAddVoting(votingData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-black">Sistema de Votaciones</h1>
              <span className="text-sm text-gray-500">ASECH - Asociación de Emprendedores</span>
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Crear Votación
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
              <CardTitle className="text-sm font-medium">Total Votaciones</CardTitle>
              <Vote className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-gray-600">
                {stats.active} activas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participación</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVotes}</div>
              <p className="text-xs text-gray-600">
                de {stats.totalVoters} votantes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Promedio Participación</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageParticipation}%</div>
              <p className="text-xs text-gray-600">
                participación promedio
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completadas</CardTitle>
              <CheckCircle className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completed}</div>
              <p className="text-xs text-gray-600">
                votaciones finalizadas
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
                  placeholder="Buscar votaciones..."
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
                  <SelectItem value="upcoming">Próximas</SelectItem>
                  <SelectItem value="active">Activas</SelectItem>
                  <SelectItem value="completed">Completadas</SelectItem>
                  <SelectItem value="cancelled">Canceladas</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="single">Voto Único</SelectItem>
                  <SelectItem value="multiple">Voto Múltiple</SelectItem>
                  <SelectItem value="ranked">Voto Preferencial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Voting Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <VotingForm
              voting={editingVoting || undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingVoting(null);
              }}
              loading={loading}
            />
          </div>
        )}

        {/* Votings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVotings.map((voting) => (
            <VotingCard
              key={voting.id}
              voting={voting}
              onEdit={(voting) => {
                setEditingVoting(voting);
                setShowForm(true);
              }}
              onDelete={handleDeleteVoting}
              onVote={handleVote}
              hasVoted={userVotes.has(voting.id)}
            />
          ))}
        </div>

        {filteredVotings.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' ? 'No se encontraron votaciones' : 'No hay votaciones aún'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'Intenta con otros filtros de búsqueda'
                  : 'Comienza creando la primera votación para tu comunidad'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && typeFilter === 'all' && (
                <Button onClick={() => setShowForm(true)}>
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