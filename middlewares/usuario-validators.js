import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Validaciones para crear usuarios
export const validateCreateUsuario = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),

  body('apellido')
    .trim()
    .notEmpty()
    .withMessage('El apellido es requerido')
    .isLength({ min: 2, max: 100 })
    .withMessage('El apellido debe tener entre 2 y 100 caracteres'),

  body('correo')
    .trim()
    .notEmpty()
    .withMessage('El correo es requerido')
    .isEmail()
    .withMessage('Correo inválido'),

  body('contrasena')
    .trim()
    .notEmpty()
    .withMessage('La contraseña es requerida')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),

  checkValidators,
];

// Validaciones para actualizar usuarios
export const validateUpdateUsuarioRequest = [
  param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId válido de MongoDB'),

  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),

  body('apellido')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El apellido debe tener entre 2 y 100 caracteres'),

  body('correo')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Correo inválido'),

  body('contrasena')
    .optional()
    .trim()
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),

  checkValidators,
];

// Validación para activar/desactivar usuarios
export const validateUsuarioStatusChange = [
  param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId válido de MongoDB'),
  checkValidators,
];

// Validación para obtener usuario por ID
export const validateGetUsuarioById = [
  param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId válido de MongoDB'),
  checkValidators,
];
