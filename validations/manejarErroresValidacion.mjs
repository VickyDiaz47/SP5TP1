import { validationResult } from 'express-validator';

export function manejarErroresDeValidacion(req, res, next) {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    const listaErrores = errores.array().map(err => err.msg);
    const esAPI = req.originalUrl.startsWith('/api');

    if (esAPI) {
      // Respuesta para API
      return res.status(400).json({
        mensaje: 'Error de validación en los datos enviados',
        errores: listaErrores
      });
    } else {
      // Respuesta para vistas (ej: renderizar el mismo form con errores)
      return res.status(400).render('errorValidacion', {
        errores: listaErrores
      });
    }
  }

  next();
}
