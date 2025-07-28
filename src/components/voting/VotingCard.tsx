import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Vote, Calendar, Users, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { formatDate } from "@/lib/utils";

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

interface VotingCardProps {
  voting: Voting;
  onView?: (voting: Voting) => void;
  onEdit?: (voting: Voting) => void;
  onDelete?: (votingId: string) => void;
  onVote?: (votingId: string) => void;
  hasVoted?: boolean;
}

export function VotingCard({ voting, onView, onEdit, onDelete, onVote, hasVoted = false }: VotingCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Próxima';
      case 'active': return 'Activa';
      case 'completed': return 'Completada';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  const getVotingTypeColor = (type: string) => {
    switch (type) {
      case 'single': return 'bg-purple-100 text-purple-800';
      case 'multiple': return 'bg-orange-100 text-orange-800';
      case 'ranked': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVotingTypeText = (type: string) => {
    switch (type) {
      case 'single': return 'Voto Único';
      case 'multiple': return 'Voto Múltiple';
      case 'ranked': return 'Voto Preferencial';
      default: return type;
    }
  };

  const isActive = voting.status === 'active';
  const isCompleted = voting.status === 'completed';
  const canVote = isActive && !hasVoted;
  const participationRate = voting.total_voters > 0 ? Math.round((voting.current_votes / voting.total_voters) * 100) : 0;

  // Encontrar la opción ganadora
  const winningOption = voting.options.reduce((prev, current) => 
    (current.votes > prev.votes) ? current : prev
  );

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Vote className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{voting.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {voting.description}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <Badge className={getStatusColor(voting.status)}>
              {getStatusText(voting.status)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-4 w-4 text-neutral-600" />
          <span className="text-gray-600">
            {formatDate(voting.start_date)} - {formatDate(voting.end_date)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-neutral-600" />
            <span className="text-sm text-gray-600">
              {voting.current_votes}/{voting.total_voters} votos ({participationRate}%)
            </span>
          </div>
          <Badge className={getVotingTypeColor(voting.voting_type)}>
            {getVotingTypeText(voting.voting_type)}
          </Badge>
        </div>

        {/* Opciones de votación */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Opciones:</h4>
          {voting.options.slice(0, 3).map((option) => (
            <div key={option.id} className="flex items-center justify-between text-sm">
              <span className="text-gray-600 truncate">{option.text}</span>
              <span className="font-medium">{option.votes} votos</span>
            </div>
          ))}
          {voting.options.length > 3 && (
            <div className="text-sm text-neutral-600">
              +{voting.options.length - 3} opciones más
            </div>
          )}
        </div>

        {/* Resultado si está completada */}
        {isCompleted && winningOption && (
          <div className="bg-green-50 border border-green-200 rounded-md p-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Ganador: {winningOption.text} ({winningOption.votes} votos)
              </span>
            </div>
          </div>
        )}

        {/* Alerta si está activa y no ha votado */}
        {isActive && !hasVoted && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">
                ⚠️ No has votado aún
              </span>
            </div>
          </div>
        )}

        {/* Alerta si ya votó */}
        {hasVoted && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                ✅ Ya has votado
              </span>
            </div>
          </div>
        )}

        <div className="flex space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onView?.(voting)}
          >
            Ver Detalles
          </Button>
          {canVote && (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => onVote?.(voting.id)}
            >
              Votar
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onEdit?.(voting)}
          >
            Editar
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onDelete?.(voting.id)}
          >
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 