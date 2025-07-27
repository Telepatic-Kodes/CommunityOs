import { supabase } from './supabase';

export interface Voting {
  id: string;
  organization_id: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'closed' | 'cancelled';
  voting_method: 'simple' | 'ranked' | 'approval';
  start_date: string;
  end_date: string;
  require_authentication: boolean;
  allow_anonymous: boolean;
  require_quorum: boolean;
  quorum_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface VotingOption {
  id: string;
  voting_id: string;
  title: string;
  description?: string;
  order: number;
  created_at: string;
}

export interface VotingVote {
  id: string;
  voting_id: string;
  member_id: string;
  option_id: string;
  rank?: number;
  created_at: string;
}

export interface VotingStats {
  total: number;
  active: number;
  closed: number;
  draft: number;
  cancelled: number;
  upcoming: number;
  averageParticipation: number;
}

// Obtener estadísticas de votaciones
export async function getVotingStats(organizationId: string): Promise<VotingStats> {
  try {
    const { data, error } = await supabase
      .from('votings')
      .select('status, start_date, end_date')
      .eq('organization_id', organizationId);

    if (error) {
      console.error('Error fetching voting stats:', error);
      return {
        total: 0,
        active: 0,
        closed: 0,
        draft: 0,
        cancelled: 0,
        upcoming: 0,
        averageParticipation: 0
      };
    }

    const now = new Date();
    const stats: VotingStats = {
      total: data?.length || 0,
      active: 0,
      closed: 0,
      draft: 0,
      cancelled: 0,
      upcoming: 0,
      averageParticipation: 0
    };

    data?.forEach(voting => {
      const startDate = new Date(voting.start_date);
      const endDate = new Date(voting.end_date);

      switch (voting.status) {
        case 'active':
          stats.active++;
          break;
        case 'closed':
          stats.closed++;
          break;
        case 'draft':
          stats.draft++;
          break;
        case 'cancelled':
          stats.cancelled++;
          break;
      }

      if (startDate > now) {
        stats.upcoming++;
      }
    });

    // Calcular participación promedio (simulado)
    stats.averageParticipation = Math.round(Math.random() * 40 + 60); // 60-100%

    return stats;
  } catch (error) {
    console.error('Error in getVotingStats:', error);
    return {
      total: 0,
      active: 0,
      closed: 0,
      draft: 0,
      cancelled: 0,
      upcoming: 0,
      averageParticipation: 0
    };
  }
}

// Obtener todas las votaciones de una organización
export async function getVotings(organizationId: string): Promise<Voting[]> {
  try {
    const { data, error } = await supabase
      .from('votings')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching votings:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getVotings:', error);
    return [];
  }
}

// Obtener una votación por ID
export async function getVoting(id: string): Promise<Voting | null> {
  try {
    const { data, error } = await supabase
      .from('votings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching voting:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getVoting:', error);
    return null;
  }
}

// Crear una nueva votación
export async function createVoting(organizationId: string, votingData: Omit<Voting, 'id' | 'organization_id' | 'created_at' | 'updated_at'>): Promise<Voting | null> {
  try {
    const { data, error } = await supabase
      .from('votings')
      .insert([{
        organization_id: organizationId,
        ...votingData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating voting:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in createVoting:', error);
    return null;
  }
}

// Actualizar una votación
export async function updateVoting(votingId: string, votingData: Partial<Voting>): Promise<Voting | null> {
  try {
    const { data, error } = await supabase
      .from('votings')
      .update({
        ...votingData,
        updated_at: new Date().toISOString()
      })
      .eq('id', votingId)
      .select()
      .single();

    if (error) {
      console.error('Error updating voting:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in updateVoting:', error);
    return null;
  }
}

// Eliminar una votación
export async function deleteVoting(votingId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('votings')
      .delete()
      .eq('id', votingId);

    if (error) {
      console.error('Error deleting voting:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteVoting:', error);
    return false;
  }
}

// Obtener opciones de una votación
export async function getVotingOptions(votingId: string): Promise<VotingOption[]> {
  try {
    const { data, error } = await supabase
      .from('voting_options')
      .select('*')
      .eq('voting_id', votingId)
      .order('order', { ascending: true });

    if (error) {
      console.error('Error fetching voting options:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getVotingOptions:', error);
    return [];
  }
}

// Crear una opción de votación
export async function createVotingOption(votingId: string, optionData: Omit<VotingOption, 'id' | 'voting_id' | 'created_at'>): Promise<VotingOption | null> {
  try {
    const { data, error } = await supabase
      .from('voting_options')
      .insert([{
        voting_id: votingId,
        ...optionData,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating voting option:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in createVotingOption:', error);
    return null;
  }
}

// Registrar un voto
export async function castVote(votingId: string, memberId: string, optionId: string, rank?: number): Promise<VotingVote | null> {
  try {
    const { data, error } = await supabase
      .from('voting_votes')
      .insert([{
        voting_id: votingId,
        member_id: memberId,
        option_id: optionId,
        rank,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error casting vote:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in castVote:', error);
    return null;
  }
}

// Obtener resultados de una votación
export async function getVotingResults(votingId: string): Promise<{ optionId: string; title: string; votes: number; percentage: number }[]> {
  try {
    // Por ahora, retornamos datos simulados
    // TODO: Implementar consulta real cuando la base de datos esté configurada
    return [
      { optionId: '1', title: 'Opción A', votes: 15, percentage: 60 },
      { optionId: '2', title: 'Opción B', votes: 10, percentage: 40 }
    ];
  } catch (error) {
    console.error('Error in getVotingResults:', error);
    return [];
  }
} 