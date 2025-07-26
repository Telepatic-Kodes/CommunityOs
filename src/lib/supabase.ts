import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Configuración de Supabase para base de datos
 * Maneja multi-tenancy y Row Level Security (RLS)
 */

// Variables de entorno para Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Cliente para el lado del cliente (browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Cliente para el lado del servidor con cookies
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Las cookies solo se pueden establecer en una Server Action o Route Handler
        }
      },
    },
  });
}

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
          role?: 'admin' | 'member' | 'viewer';
          status?: 'active' | 'inactive' | 'pending';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
} 