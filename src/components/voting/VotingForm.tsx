import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Vote, Calendar, Users, Plus, X, Trash2 } from "lucide-react";

interface VotingOption {
  id: string;
  text: string;
  votes?: number;
}

interface Voting {
  id?: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  total_voters: number;
  current_votes?: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  voting_type: 'single' | 'multiple' | 'ranked';
  options: VotingOption[];
}

interface VotingFormProps {
  voting?: Voting;
  onSubmit: (voting: Voting) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function VotingForm({ voting, onSubmit, onCancel, loading = false }: VotingFormProps) {
  const [formData, setFormData] = useState<Voting>({
    title: voting?.title || '',
    description: voting?.description || '',
    start_date: voting?.start_date || new Date().toISOString().split('T')[0],
    end_date: voting?.end_date || new Date().toISOString().split('T')[0],
    total_voters: voting?.total_voters || 100,
    current_votes: voting?.current_votes || 0,
    status: voting?.status || 'upcoming',
    voting_type: voting?.voting_type || 'single',
    options: voting?.options || [{ id: '1', text: '' }, { id: '2', text: '' }],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que haya al menos 2 opciones con texto
    const validOptions = formData.options.filter(option => option.text.trim() !== '');
    if (validOptions.length < 2) {
      alert('Debes agregar al menos 2 opciones de votación');
      return;
    }

    onSubmit({
      ...formData,
      options: validOptions
    });
  };

  const handleChange = (field: keyof Voting, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addOption = () => {
    const newId = (formData.options.length + 1).toString();
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, { id: newId, text: '' }]
    }));
  };

  const removeOption = (id: string) => {
    if (formData.options.length <= 2) {
      alert('Debes mantener al menos 2 opciones');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter(option => option.id !== id)
    }));
  };

  const updateOption = (id: string, text: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.map(option => 
        option.id === id ? { ...option, text } : option
      )
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Vote className="h-5 w-5" />
          <CardTitle>{voting ? 'Editar Votación' : 'Crear Votación'}</CardTitle>
        </div>
        <CardDescription>
          {voting ? 'Actualiza la información de la votación' : 'Crea una nueva votación para la comunidad'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título de la Votación</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="¿Deberíamos cambiar la fecha de la reunión mensual?"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Descripción detallada de la votación..."
              className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Fecha de Inicio</Label>
              <Input
                id="start_date"
                type="datetime-local"
                value={formData.start_date}
                onChange={(e) => handleChange('start_date', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">Fecha de Fin</Label>
              <Input
                id="end_date"
                type="datetime-local"
                value={formData.end_date}
                onChange={(e) => handleChange('end_date', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="total_voters">Total de Votantes</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="total_voters"
                  type="number"
                  value={formData.total_voters}
                  onChange={(e) => handleChange('total_voters', parseInt(e.target.value) || 0)}
                  placeholder="100"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="voting_type">Tipo de Votación</Label>
              <Select value={formData.voting_type} onValueChange={(value) => handleChange('voting_type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Voto Único</SelectItem>
                  <SelectItem value="multiple">Voto Múltiple</SelectItem>
                  <SelectItem value="ranked">Voto Preferencial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">Próxima</SelectItem>
                <SelectItem value="active">Activa</SelectItem>
                <SelectItem value="completed">Completada</SelectItem>
                <SelectItem value="cancelled">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Opciones de votación */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Opciones de Votación</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addOption}
              >
                <Plus className="h-4 w-4 mr-1" />
                Agregar
              </Button>
            </div>
            
            <div className="space-y-2">
              {formData.options.map((option, index) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Input
                    value={option.text}
                    onChange={(e) => updateOption(option.id, e.target.value)}
                    placeholder={`Opción ${index + 1}`}
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeOption(option.id)}
                    disabled={formData.options.length <= 2}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="flex-1"
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={loading}
            >
              <Vote className="h-4 w-4 mr-2" />
              {loading ? 'Guardando...' : (voting ? 'Actualizar' : 'Crear')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 