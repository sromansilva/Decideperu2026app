/**
 * Database Types - Generado desde Supabase CLI
 * Tipos TypeScript para la base de datos
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'user'
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role?: 'admin' | 'user'
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'user'
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      candidates: {
        Row: {
          id: string
          name: string
          party: string
          short_party: string
          position: 'Presidencial' | 'Congreso' | 'Parlamento Andino'
          region: string
          photo_url: string | null
          bio: string | null
          plan_resumen: string | null
          proposals: string | null
          history: string | null
          social_media: Json | null
          status: 'active' | 'pending' | 'rejected'
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          name: string
          party: string
          short_party: string
          position: 'Presidencial' | 'Congreso' | 'Parlamento Andino'
          region: string
          photo_url?: string | null
          bio?: string | null
          plan_resumen?: string | null
          proposals?: string | null
          history?: string | null
          social_media?: Json | null
          status?: 'active' | 'pending' | 'rejected'
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          name?: string
          party?: string
          short_party?: string
          position?: 'Presidencial' | 'Congreso' | 'Parlamento Andino'
          region?: string
          photo_url?: string | null
          bio?: string | null
          plan_resumen?: string | null
          proposals?: string | null
          history?: string | null
          social_media?: Json | null
          status?: 'active' | 'pending' | 'rejected'
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
      }
      news: {
        Row: {
          id: string
          title: string
          category: string
          image_url: string | null
          excerpt: string
          content: string
          date: string
          author: string
          views: number
          status: 'published' | 'draft' | 'scheduled'
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          title: string
          category: string
          image_url?: string | null
          excerpt: string
          content: string
          date?: string
          author: string
          views?: number
          status?: 'published' | 'draft' | 'scheduled'
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          title?: string
          category?: string
          image_url?: string | null
          excerpt?: string
          content?: string
          date?: string
          author?: string
          views?: number
          status?: 'published' | 'draft' | 'scheduled'
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
      }
      events: {
        Row: {
          id: string
          title: string
          date: string
          time: string
          location: string
          description: string
          category: 'electoral' | 'capacity' | 'deadline' | 'general'
          participants: number | null
          status: 'upcoming' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          title: string
          date: string
          time: string
          location: string
          description: string
          category: 'electoral' | 'capacity' | 'deadline' | 'general'
          participants?: number | null
          status?: 'upcoming' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          title?: string
          date?: string
          time?: string
          location?: string
          description?: string
          category?: 'electoral' | 'capacity' | 'deadline' | 'general'
          participants?: number | null
          status?: 'upcoming' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'admin' | 'user'
      candidate_status: 'active' | 'pending' | 'rejected'
      candidate_position: 'Presidencial' | 'Congreso' | 'Parlamento Andino'
      news_status: 'published' | 'draft' | 'scheduled'
      event_category: 'electoral' | 'capacity' | 'deadline' | 'general'
      event_status: 'upcoming' | 'completed' | 'cancelled'
    }
  }
}
