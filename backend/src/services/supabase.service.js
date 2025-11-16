import { supabaseAdmin } from '../config/supabase.js';

/**
 * Servicio base para operaciones con Supabase
 */
export class SupabaseService {
  /**
   * Obtener un registro por ID
   */
  static async findById(table, id) {
    const { data, error } = await supabaseAdmin
      .from(table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Error fetching ${table}: ${error.message}`);
    }

    return data;
  }

  /**
   * Obtener todos los registros con filtros opcionales
   */
  static async findAll(table, filters = {}) {
    let query = supabaseAdmin.from(table).select('*');

    // Aplicar filtros
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        query = query.eq(key, filters[key]);
      }
    });

    const { data, error } = await query;

    if (error) {
      throw new Error(`Error fetching ${table}: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Crear un nuevo registro
   */
  static async create(table, payload) {
    const { data, error } = await supabaseAdmin
      .from(table)
      .insert(payload)
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating ${table}: ${error.message}`);
    }

    return data;
  }

  /**
   * Actualizar un registro
   */
  static async update(table, id, payload) {
    const { data, error } = await supabaseAdmin
      .from(table)
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating ${table}: ${error.message}`);
    }

    return data;
  }

  /**
   * Eliminar un registro
   */
  static async delete(table, id) {
    const { error } = await supabaseAdmin
      .from(table)
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Error deleting ${table}: ${error.message}`);
    }

    return { success: true, message: `${table} deleted successfully` };
  }

  /**
   * Buscar por campo específico
   */
  static async findByField(table, field, value) {
    const { data, error } = await supabaseAdmin
      .from(table)
      .select('*')
      .eq(field, value)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No encontrado
      }
      throw new Error(`Error fetching ${table}: ${error.message}`);
    }

    return data;
  }

  /**
   * Obtener usuario por email
   */
  static async getUserByEmail(email) {
    return this.findByField('users', 'email', email);
  }

  /**
   * Obtener usuario por ID
   */
  static async getUserById(id) {
    return this.findById('users', id);
  }
}

