import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const RENIEC_API_URL = process.env.EXTERNAL_API_RENIEC_URL || 'https://api.decolecta.com/v1/reniec/dni';
const RENIEC_API_TOKEN = process.env.EXTERNAL_API_RENIEC_TOKEN || '';

/**
 * Servicio para consultar la API externa de RENIEC
 */
export class ReniecService {
  /**
   * Consultar datos de un DNI en RENIEC
   * @param {string} dni - Número de DNI a consultar
   * @param {string} token - Token opcional para autenticación (si no se proporciona, usa el de env)
   * @returns {Promise<Object>} Datos del ciudadano
   */
  static async consultarDNI(dni, token = null) {
    try {
      // Validar formato de DNI (8 dígitos)
      if (!/^\d{8}$/.test(dni)) {
        throw new Error('El DNI debe tener 8 dígitos');
      }

      const url = `${RENIEC_API_URL}?numero=${dni}`;
      
      // Preparar headers
      const headers = {
        'Accept': 'application/json',
        'User-Agent': 'DecidePeru2026-Backend/1.0'
      };

      // Agregar token si está disponible
      const authToken = token || RENIEC_API_TOKEN;
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
        // También intentar como header personalizado si la API lo requiere
        headers['X-API-Key'] = authToken;
        headers['Token'] = authToken;
      }
      
      const response = await axios.get(url, {
        timeout: 10000, // 10 segundos de timeout
        headers
      });

      // Validar respuesta
      if (!response.data) {
        throw new Error('No se recibieron datos de la API de RENIEC');
      }

      // Normalizar respuesta según la estructura esperada
      const data = response.data;
      
      return {
        dni: dni,
        nombres: data.nombres || data.nombre || '',
        apellidoPaterno: data.apellidoPaterno || data.apellido_paterno || '',
        apellidoMaterno: data.apellidoMaterno || data.apellido_materno || '',
        nombreCompleto: this._buildFullName(data),
        fechaNacimiento: data.fechaNacimiento || data.fecha_nacimiento || null,
        sexo: data.sexo || null,
        estadoCivil: data.estadoCivil || data.estado_civil || null,
        direccion: data.direccion || null,
        distrito: data.distrito || null,
        provincia: data.provincia || null,
        departamento: data.departamento || null,
        rawData: data // Datos completos de la API
      };
    } catch (error) {
      if (error.response) {
        // Error de la API externa
        throw new Error(`Error de RENIEC: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        // No se recibió respuesta
        throw new Error('No se pudo conectar con el servicio de RENIEC');
      } else {
        // Error en la configuración de la petición
        throw new Error(`Error al consultar RENIEC: ${error.message}`);
      }
    }
  }

  /**
   * Construir nombre completo
   * @private
   */
  static _buildFullName(data) {
    const nombres = data.nombres || data.nombre || '';
    const apellidoPaterno = data.apellidoPaterno || data.apellido_paterno || '';
    const apellidoMaterno = data.apellidoMaterno || data.apellido_materno || '';
    
    return `${nombres} ${apellidoPaterno} ${apellidoMaterno}`.trim();
  }

  /**
   * Validar formato de DNI
   */
  static validateDNI(dni) {
    return /^\d{8}$/.test(dni);
  }
}

