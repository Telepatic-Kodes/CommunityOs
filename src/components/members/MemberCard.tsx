'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  UserCheck,
  UserX
} from 'lucide-react';

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

interface MemberCardProps {
  member: Member;
  onEdit: (member: Member) => void;
  onDelete: (memberId: string) => void;
}

export default function MemberCard({ member, onEdit, onDelete }: MemberCardProps) {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <UserCheck className="h-4 w-4 text-green-600" />;
      case 'inactive':
        return <UserX className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Calendar className="h-4 w-4 text-yellow-600" />;
      default:
        return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium text-gray-600">
                {member.firstName[0]}{member.lastName[0]}
              </span>
            </div>
            <div>
              <CardTitle className="text-lg">
                {member.firstName} {member.lastName}
              </CardTitle>
              <CardDescription className="flex items-center space-x-2">
                {getStatusIcon(member.status)}
                <span>{member.email}</span>
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge(member.status)}
            {getRoleBadge(member.role)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Información de contacto */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="h-4 w-4" />
            <span>{member.email}</span>
          </div>
          {member.phone && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              <span>{member.phone}</span>
            </div>
          )}
        </div>

        {/* Fechas */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Se unió: {formatDate(member.joinedAt)}</span>
          </div>
          {member.lastActive && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>Última actividad: {formatDate(member.lastActive)}</span>
            </div>
          )}
        </div>

        {/* Acciones */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="text-xs text-gray-500">
            ID: {member.id}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(member)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(member.id)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 