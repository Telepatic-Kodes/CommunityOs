import { supabase } from './supabase';

export interface Member {
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

export interface CreateMemberData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'admin' | 'member' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
}

export interface UpdateMemberData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: 'admin' | 'member' | 'viewer';
  status?: 'active' | 'inactive' | 'pending';
}

export interface MemberStats {
  total: number;
  active: number;
  pending: number;
  inactive: number;
  admins: number;
  members: number;
  viewers: number;
}

// Obtener todos los miembros de una organización
export async function getMembers(organizationId: string): Promise<Member[]> {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching members:', error);
      return [];
    }

    return data?.map(member => ({
      id: member.id,
      firstName: member.first_name,
      lastName: member.last_name,
      email: member.email,
      phone: member.phone,
      role: member.role,
      status: member.status,
      joinedAt: member.created_at,
      lastActive: member.updated_at
    })) || [];
  } catch (error) {
    console.error('Error in getMembers:', error);
    return [];
  }
}

// Obtener estadísticas de miembros
export async function getMemberStats(organizationId: string): Promise<MemberStats> {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('role, status')
      .eq('organization_id', organizationId);

    if (error) {
      console.error('Error fetching member stats:', error);
      return {
        total: 0,
        active: 0,
        pending: 0,
        inactive: 0,
        admins: 0,
        members: 0,
        viewers: 0
      };
    }

    const stats: MemberStats = {
      total: data?.length || 0,
      active: data?.filter(m => m.status === 'active').length || 0,
      pending: data?.filter(m => m.status === 'pending').length || 0,
      inactive: data?.filter(m => m.status === 'inactive').length || 0,
      admins: data?.filter(m => m.role === 'admin').length || 0,
      members: data?.filter(m => m.role === 'member').length || 0,
      viewers: data?.filter(m => m.role === 'viewer').length || 0
    };

    return stats;
  } catch (error) {
    console.error('Error in getMemberStats:', error);
    return {
      total: 0,
      active: 0,
      pending: 0,
      inactive: 0,
      admins: 0,
      members: 0,
      viewers: 0
    };
  }
}

// Crear un nuevo miembro
export async function createMember(organizationId: string, memberData: Omit<Member, 'id' | 'joinedAt'>): Promise<Member | null> {
  try {
    const { data, error } = await supabase
      .from('members')
      .insert({
        organization_id: organizationId,
        first_name: memberData.firstName,
        last_name: memberData.lastName,
        email: memberData.email,
        phone: memberData.phone,
        role: memberData.role,
        status: memberData.status
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating member:', error);
      return null;
    }

    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      status: data.status,
      joinedAt: data.created_at,
      lastActive: data.updated_at
    };
  } catch (error) {
    console.error('Error in createMember:', error);
    return null;
  }
}

// Actualizar un miembro existente
export async function updateMember(memberId: string, memberData: Partial<Member>): Promise<Member | null> {
  try {
    const updateData: Record<string, unknown> = {};
    
    if (memberData.firstName) updateData.first_name = memberData.firstName;
    if (memberData.lastName) updateData.last_name = memberData.lastName;
    if (memberData.email) updateData.email = memberData.email;
    if (memberData.phone !== undefined) updateData.phone = memberData.phone;
    if (memberData.role) updateData.role = memberData.role;
    if (memberData.status) updateData.status = memberData.status;

    const { data, error } = await supabase
      .from('members')
      .update(updateData)
      .eq('id', memberId)
      .select()
      .single();

    if (error) {
      console.error('Error updating member:', error);
      return null;
    }

    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      status: data.status,
      joinedAt: data.created_at,
      lastActive: data.updated_at
    };
  } catch (error) {
    console.error('Error in updateMember:', error);
    return null;
  }
}

// Eliminar un miembro
export async function deleteMember(memberId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', memberId);

    if (error) {
      console.error('Error deleting member:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteMember:', error);
    return false;
  }
}

// Obtener un miembro por ID
export async function getMemberById(memberId: string): Promise<Member | null> {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('id', memberId)
      .single();

    if (error) {
      console.error('Error fetching member:', error);
      return null;
    }

    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      status: data.status,
      joinedAt: data.created_at,
      lastActive: data.updated_at
    };
  } catch (error) {
    console.error('Error in getMemberById:', error);
    return null;
  }
}

// Buscar miembros por nombre, email o teléfono
export async function searchMembers(organizationId: string, query: string): Promise<Member[]> {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('organization_id', organizationId)
      .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching members:', error);
      return [];
    }

    return data?.map(member => ({
      id: member.id,
      firstName: member.first_name,
      lastName: member.last_name,
      email: member.email,
      phone: member.phone,
      role: member.role,
      status: member.status,
      joinedAt: member.created_at,
      lastActive: member.updated_at
    })) || [];
  } catch (error) {
    console.error('Error in searchMembers:', error);
    return [];
  }
} 