'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Edit, 
  Trash2, 
  Eye,
  MoreHorizontal
} from 'lucide-react';
import { useState } from 'react';

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
  location?: string;
  avatar?: string;
}

interface MemberCardProps {
  member: Member;
  onEdit?: (member: Member) => void;
  onDelete?: (memberId: string) => void;
  onView?: (member: Member) => void;
}

export default function MemberCard({ member, onEdit, onDelete, onView }: MemberCardProps) {
  const [showActions, setShowActions] = useState(false);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover-lift">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {member.avatar ? (
              <img 
                src={member.avatar} 
                alt={`${member.firstName} ${member.lastName}`}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {getInitials(member.firstName, member.lastName)}
              </div>
            )}
            <div>
              <CardTitle className="text-lg font-semibold text-neutral-900">
                {member.firstName} {member.lastName}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                {getStatusBadge(member.status)}
                {getRoleBadge(member.role)}
              </div>
            </div>
          </div>
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowActions(!showActions)}
              className="p-2"
            >
              <MoreHorizontal className="h-4 w-4 text-neutral-700" />
            </Button>
            {showActions && (
              <div className="absolute right-0 top-10 bg-white border border-neutral-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                {onView && (
                  <button
                    onClick={() => onView(member)}
                    className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center space-x-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Ver</span>
                  </button>
                )}
                {onEdit && (
                  <button
                    onClick={() => onEdit(member)}
                    className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Editar</span>
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(member.id)}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Eliminar</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-neutral-700" />
            <span className="text-lg font-medium text-neutral-700">
              {member.email}
            </span>
          </div>
          
          {member.phone && (
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-neutral-700" />
              <span className="text-neutral-700">{member.phone}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-neutral-700" />
            <span className="text-neutral-700">
              Miembro desde {formatDate(member.joinedAt)}
            </span>
          </div>
          
          {member.lastActive && (
            <div className="flex items-center space-x-3">
              <User className="h-4 w-4 text-neutral-700" />
              <span className="text-neutral-700">
                Última actividad: {formatDate(member.lastActive)}
              </span>
            </div>
          )}
          
          {member.location && (
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-neutral-700" />
              <span className="text-neutral-700">{member.location}</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-neutral-200">
          <div className="flex items-center justify-between text-sm text-neutral-700">
            <span>ID: {member.id}</span>
            <span className="text-xs text-neutral-600">
              Actualizado: {formatDate(member.joinedAt)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 