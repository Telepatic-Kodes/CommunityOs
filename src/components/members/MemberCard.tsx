import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, MoreHorizontal } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Member {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
}

interface MemberCardProps {
  member: Member;
  onEdit?: (member: Member) => void;
  onDelete?: (memberId: string) => void;
}

export function MemberCard({ member, onEdit, onDelete }: MemberCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'member': return 'bg-blue-100 text-blue-800';
      case 'viewer': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <CardTitle className="text-lg">
                {member.first_name} {member.last_name}
              </CardTitle>
              <CardDescription className="flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>{member.email}</span>
              </CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Miembro desde {formatDate(member.created_at)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge className={getStatusColor(member.status)}>
            {member.status === 'active' ? 'Activo' : 
             member.status === 'inactive' ? 'Inactivo' : 'Pendiente'}
          </Badge>
          <Badge className={getRoleColor(member.role)}>
            {member.role === 'admin' ? 'Administrador' : 
             member.role === 'member' ? 'Miembro' : 'Visualizador'}
          </Badge>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onEdit?.(member)}
          >
            Editar
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onDelete?.(member.id)}
          >
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 