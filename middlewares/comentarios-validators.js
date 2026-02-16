import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Validación para crear un comentario
export const validateCreateComentario = [
  body('descripcion')
    .trim()
    .notEmpty()
    .withMessage('La descripción del comentario es obligatoria')
    .isLength({ min: 5, max: 500 })
    .withMessage('La descripción debe tener entre 5 y 500 caracteres'),

  body('publicacion')
    .notEmpty()
    .withMessage('La publicación a la que pertenece el comentario es obligatoria')
    .isMongoId()
    .withMessage('El ID de la publicación debe ser un ObjectId válido de MongoDB'),

  checkValidators,
];

// Validación para actualizar un comentario
export const validateUpdateComentarioRequest = [
  param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId válido de MongoDB'),

  body('descripcion')
    .optional()
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage('La descripción debe tener entre 5 y 500 caracteres'),

  body('publicacion')
    .optional()
    .isMongoId()
    .withMessage('El ID de la publicación debe ser un ObjectId válido de MongoDB'),

  checkValidators,
];

// Validación para activar/desactivar comentario
export const validateComentarioStatusChange = [
  param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId válido de MongoDB'),
  checkValidators,
];

// Validación para obtener comentario por ID
export const validateGetComentarioById = [
  param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId válido de MongoDB'),
  checkValidators,
];
