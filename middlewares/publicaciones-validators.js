import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Validación para crear una publicación
export const validateCreatePublicacion = [
  body('titulo')
    .trim()
    .notEmpty()
    .withMessage('El título es obligatorio')
    .isLength({ min: 5, max: 200 })
    .withMessage('El título debe tener entre 5 y 200 caracteres'),

  body('descripcion')
    .trim()
    .notEmpty()
    .withMessage('La descripción es obligatoria')
    .isLength({ min: 10, max: 500 })
    .withMessage('La descripción debe tener entre 10 y 500 caracteres'),

  body('usuario')
    .notEmpty()
    .withMessage('El usuario que crea la publicación es obligatorio')
    .isMongoId()
    .withMessage('El ID del usuario debe ser un ObjectId válido de MongoDB'),

  checkValidators,
];

// Validación para actualizar una publicación
export const validateUpdatePublicacionRequest = [
  param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId válido de MongoDB'),

  body('titulo')
    .optional()
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('El título debe tener entre 5 y 200 caracteres'),

  body('descripcion')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('La descripción debe tener entre 10 y 500 caracteres'),

  body('usuario')
    .optional()
    .isMongoId()
    .withMessage('El ID del usuario debe ser un ObjectId válido de MongoDB'),

  checkValidators,
];

// Validación para obtener publicación por ID
export const validateGetPublicacionById = [
  param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId válido de MongoDB'),
  checkValidators,
];

// Validación para activar/desactivar publicación
export const validatePublicacionStatusChange = [
  param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId válido de MongoDB'),
  checkValidators,
];
