import { createClient } from '@supabase/supabase-js';

/**
 * Configuración de Supabase para base de datos
 * Maneja multi-tenancy y Row Level Security (RLS)
 */

// Variables de entorno para Supabase con valores por defecto para desarrollo
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key';

// Cliente para el lado del cliente (browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Cliente de servicio para operaciones administrativas
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

/**
 * Tipos de datos para la base de datos
 */
export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          clerk_org_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          clerk_org_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          clerk_org_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      members: {
        Row: {
          id: string;
          organization_id: string;
          clerk_user_id: string;
          email: string;
          first_name: string;
          last_name: string;
          phone?: string;
          role: 'admin' | 'member' | 'viewer';
          status: 'active' | 'inactive' | 'pending';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          clerk_user_id: string;
          email: string;
          first_name: string;
          last_name: string;
          phone?: string;
          role?: 'admin' | 'member' | 'viewer';
          status?: 'active' | 'inactive' | 'pending';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          clerk_user_id?: string;
          email?: string;
          first_name?: string;
          last_name?: string;
          phone?: string;
          role?: 'admin' | 'member' | 'viewer';
          status?: 'active' | 'inactive' | 'pending';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
} 