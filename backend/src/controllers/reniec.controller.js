import { asyncHandler } from '../middleware/error.middleware.js';
import { ReniecService } from '../services/reniec.service.js';

/**
 * Consultar DNI en RENIEC (ruta original)
 */
export const consultarDNI = asyncHandler(async (req, res) => {
  const { dni } = req.params;

  // Validar formato de DNI
  if (!ReniecService.validateDNI(dni)) {
    return res.status(400).json({
      success: false,
      message: 'El DNI debe tener exactamente 8 dígitos'
    });
  }

  // Consultar API de RENIEC
  const datos = await ReniecService.consultarDNI(dni);

  res.json({
    success: true,
    message: 'Consulta RENIEC exitosa',
    data: {
      dni: datos.dni,
      nombres: datos.nombres,
      apellidoPaterno: datos.apellidoPaterno,
      apellidoMaterno: datos.apellidoMaterno,
      nombreCompleto: datos.nombreCompleto,
      fechaNacimiento: datos.fechaNacimiento,
      sexo: datos.sexo,
      estadoCivil: datos.estadoCivil,
      direccion: datos.direccion,
      distrito: datos.distrito,
      provincia: datos.provincia,
      departamento: datos.departamento,
      consultado_at: new Date().toISOString()
    }
  });
});

/**
 * Consultar DNI en RENIEC con token personalizado (nueva ruta)
 * Esta ruta permite consultar DNI usando el token desde el backend
 */
export const consultarDNIConToken = asyncHandler(async (req, res) => {
  const { dni } = req.params;

  // Validar formato de DNI
  if (!ReniecService.validateDNI(dni)) {
    return res.status(400).json({
      success: false,
      message: 'El DNI debe tener exactamente 8 dígitos'
    });
  }

  // Consultar API de RENIEC (el token se toma de las variables de entorno)
  const datos = await ReniecService.consultarDNI(dni);

  res.json({
    success: true,
    message: 'Consulta RENIEC exitosa',
    data: {
      dni: datos.dni,
      nombres: datos.nombres,
      apellidoPaterno: datos.apellidoPaterno,
      apellidoMaterno: datos.apellidoMaterno,
      nombreCompleto: datos.nombreCompleto,
      fechaNacimiento: datos.fechaNacimiento,
      sexo: datos.sexo,
      estadoCivil: datos.estadoCivil,
      direccion: datos.direccion,
      distrito: datos.distrito,
      provincia: datos.provincia,
      departamento: datos.departamento,
      consultado_at: new Date().toISOString()
    }
  });
});

