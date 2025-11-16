/**
 * Candidates Service
 * Gestión completa de candidatos con Supabase
 */

import { supabase } from '../lib/supabaseClient';
import { Database } from '../lib/database.types';

type Candidate = Database['public']['Tables']['candidates']['Row'];
type CandidateInsert = Database['public']['Tables']['candidates']['Insert'];
type CandidateUpdate = Database['public']['Tables']['candidates']['Update'];

export interface CreateCandidateData {
  name: string;
  party: string;
  shortParty: string;
  position: 'Presidencial' | 'Congreso' | 'Parlamento Andino';
  region: string;
  photoFile?: File;
  bio?: string;
  planResumen?: string;
  proposals?: string;
  history?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  status?: 'active' | 'pending' | 'rejected';
}

class CandidatesService {
  /**
   * Obtener todos los candidatos activos (público)
   */
  async getAllActive() {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        data: data || [],
      };
    } catch (error: any) {
      console.error('Error obteniendo candidatos activos:', error);
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
  }

  /**
   * Obtener todos los candidatos (admin)
   */
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        data: data || [],
      };
    } catch (error: any) {
      console.error('Error obteniendo todos los candidatos:', error);
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
  }

  /**
   * Obtener candidato por ID
   */
  async getById(id: string) {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      console.error('Error obteniendo candidato:', error);
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  }

  /**
   * Filtrar candidatos por posición
   */
  async getByPosition(position: string) {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('position', position)
        .eq('status', 'active')
        .order('name');

      if (error) throw error;

      return {
        success: true,
        data: data || [],
      };
    } catch (error: any) {
      console.error('Error filtrando por posición:', error);
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
  }

  /**
   * Filtrar candidatos por región
   */
  async getByRegion(region: string) {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('region', region)
        .eq('status', 'active')
        .order('name');

      if (error) throw error;

      return {
        success: true,
        data: data || [],
      };
    } catch (error: any) {
      console.error('Error filtrando por región:', error);
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
  }

  /**
   * Crear nuevo candidato (admin)
   */
  async create(candidateData: CreateCandidateData) {
    try {
      // 1. Subir foto si existe
      let photoUrl = null;
      if (candidateData.photoFile) {
        const uploadResult = await this.uploadPhoto(candidateData.photoFile);
        if (uploadResult.success) {
          photoUrl = uploadResult.url;
        }
      }

      // 2. Obtener usuario actual
      const { data: { user } } = await supabase.auth.getUser();

      // 3. Crear candidato
      const insertData: CandidateInsert = {
        name: candidateData.name,
        party: candidateData.party,
        short_party: candidateData.shortParty,
        position: candidateData.position,
        region: candidateData.region,
        photo_url: photoUrl,
        bio: candidateData.bio,
        plan_resumen: candidateData.planResumen,
        proposals: candidateData.proposals,
        history: candidateData.history,
        social_media: candidateData.socialMedia || {},
        status: candidateData.status || 'pending',
        created_by: user?.id,
      };

      const { data, error } = await supabase
        .from('candidates')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data,
        message: 'Candidato creado exitosamente',
      };
    } catch (error: any) {
      console.error('Error creando candidato:', error);
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  }

  /**
   * Actualizar candidato (admin)
   */
  async update(id: string, updates: Partial<CreateCandidateData>) {
    try {
      // 1. Subir nueva foto si existe
      let photoUrl = undefined;
      if (updates.photoFile) {
        const uploadResult = await this.uploadPhoto(updates.photoFile);
        if (uploadResult.success) {
          photoUrl = uploadResult.url;
        }
      }

      // 2. Preparar datos de actualización
      const updateData: CandidateUpdate = {
        ...(updates.name && { name: updates.name }),
        ...(updates.party && { party: updates.party }),
        ...(updates.shortParty && { short_party: updates.shortParty }),
        ...(updates.position && { position: updates.position }),
        ...(updates.region && { region: updates.region }),
        ...(photoUrl && { photo_url: photoUrl }),
        ...(updates.bio !== undefined && { bio: updates.bio }),
        ...(updates.planResumen !== undefined && { plan_resumen: updates.planResumen }),
        ...(updates.proposals !== undefined && { proposals: updates.proposals }),
        ...(updates.history !== undefined && { history: updates.history }),
        ...(updates.socialMedia && { social_media: updates.socialMedia }),
        ...(updates.status && { status: updates.status }),
      };

      const { data, error } = await supabase
        .from('candidates')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data,
        message: 'Candidato actualizado exitosamente',
      };
    } catch (error: any) {
      console.error('Error actualizando candidato:', error);
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  }

  /**
   * Eliminar candidato (admin)
   */
  async delete(id: string) {
    try {
      // 1. Obtener foto para eliminarla
      const { data: candidate } = await supabase
        .from('candidates')
        .select('photo_url')
        .eq('id', id)
        .single();

      // 2. Eliminar candidato
      const { error } = await supabase
        .from('candidates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // 3. Eliminar foto si existe
      if (candidate?.photo_url) {
        await this.deletePhoto(candidate.photo_url);
      }

      return {
        success: true,
        message: 'Candidato eliminado exitosamente',
      };
    } catch (error: any) {
      console.error('Error eliminando candidato:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Subir foto de candidato a Storage
   */
  async uploadPhoto(file: File) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `candidates/${fileName}`;

      const { data, error } = await supabase.storage
        .from('candidate-photos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('candidate-photos')
        .getPublicUrl(filePath);

      return {
        success: true,
        url: publicUrl,
        path: filePath,
      };
    } catch (error: any) {
      console.error('Error subiendo foto:', error);
      return {
        success: false,
        error: error.message,
        url: null,
      };
    }
  }

  /**
   * Eliminar foto de candidato
   */
  async deletePhoto(photoUrl: string) {
    try {
      // Extraer path de la URL
      const urlParts = photoUrl.split('/candidate-photos/');
      if (urlParts.length < 2) return;

      const filePath = `candidates/${urlParts[1]}`;

      const { error } = await supabase.storage
        .from('candidate-photos')
        .remove([filePath]);

      if (error) throw error;

      return { success: true };
    } catch (error: any) {
      console.error('Error eliminando foto:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Cambiar estado del candidato (admin)
   */
  async changeStatus(id: string, status: 'active' | 'pending' | 'rejected') {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data,
        message: `Estado cambiado a ${status}`,
      };
    } catch (error: any) {
      console.error('Error cambiando estado:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Buscar candidatos por nombre
   */
  async search(query: string) {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .ilike('name', `%${query}%`)
        .eq('status', 'active')
        .order('name');

      if (error) throw error;

      return {
        success: true,
        data: data || [],
      };
    } catch (error: any) {
      console.error('Error buscando candidatos:', error);
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
  }

  /**
   * Obtener estadísticas de candidatos (admin)
   */
  async getStats() {
    try {
      const { data: all } = await supabase
        .from('candidates')
        .select('status, position');

      if (!all) throw new Error('No se pudieron obtener datos');

      const stats = {
        total: all.length,
        active: all.filter(c => c.status === 'active').length,
        pending: all.filter(c => c.status === 'pending').length,
        rejected: all.filter(c => c.status === 'rejected').length,
        byPosition: {
          presidencial: all.filter(c => c.position === 'Presidencial').length,
          congreso: all.filter(c => c.position === 'Congreso').length,
          parlamentoAndino: all.filter(c => c.position === 'Parlamento Andino').length,
        },
      };

      return {
        success: true,
        data: stats,
      };
    } catch (error: any) {
      console.error('Error obteniendo estadísticas:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

export const candidatesService = new CandidatesService();
