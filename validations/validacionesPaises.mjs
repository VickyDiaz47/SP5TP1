import { body } from 'express-validator';

export const validarPais = [
  body('nombre')
    .notEmpty().withMessage('El nombre del país es obligatorio')
    .isLength({ min: 3, max: 90 }).withMessage('El nombre debe tener entre 3 y 60 caracteres'),

  body('nombreOficial')
    .notEmpty().withMessage('El nombre oficial es obligatorio')
    .isLength({ min: 3, max: 90 }).withMessage('El nombre oficial debe tener entre 3 y 100 caracteres'),

  body('capital')
    .notEmpty().withMessage('La capital es obligatoria')
    .isLength({ min: 2, max: 60 }).withMessage('La capital debe tener entre 2 y 60 caracteres'),

  body('idioma')
    .notEmpty().withMessage('El idioma es obligatorio')
    .isLength({ min: 3, max: 40 }).withMessage('El idioma debe tener entre 3 y 40 caracteres'),

  body('area')
    .isNumeric().withMessage('El área debe ser un número')
    .custom(value => Number(value) >= 0).withMessage('El área no puede ser negativa'),

  body('population')
    .isNumeric().isInt().withMessage('La población debe ser un número')
    .custom(value => Number(value) >= 0).withMessage('La población no puede ser negativa'),

  body('codigoISO')
    .notEmpty().withMessage('El código ISO es obligatorio')
    .isLength({ min: 2, max: 3 }).withMessage('El código ISO debe tener 3 letras')
    .isAlpha().withMessage('El código ISO debe contener solo letras'),

  body('gini')
    .optional()
    .isFloat({ min: 0, max: 100 }).withMessage('El índice GINI debe estar entre 0 y 100'),

  body('borders')
    .optional()
    .isArray().withMessage('Las fronteras deben ser un array de strings')
    .custom((arr) => {
      return arr.every(
        p => typeof p === 'string' &&
             p.trim().length >= 3 &&
             p.trim().length <= 60
      );
    }).withMessage('Cada país limítrofe debe ser un string entre 3 y 60 caracteres'),

  body('timezones')
  .notEmpty().withMessage('La zona horaria es obligatoria')
  .isString().withMessage('La zona horaria debe ser un string'),
];

