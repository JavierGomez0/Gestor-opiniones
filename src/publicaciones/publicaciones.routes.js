import { Router } from 'express';
import {
    getPublicaciones,
    getPublicacionById,
    createPublicacion,
    updatePublicacion,
    changePublicacionStatus,
} from './publicaciones.controller.js';
import {
    validateCreatePublicacion,
    validateUpdatePublicacionRequest,
    validatePublicacionStatusChange,
    validateGetPublicacionById,
} from '../../middlewares/publicaciones-validators.js';

const router = Router();

// Rutas GET
router.get('/', getPublicaciones);
router.get('/:id', validateGetPublicacionById, getPublicacionById);

// Rutas POST - crear publicación
router.post(
    '/',
    validateCreatePublicacion,
    createPublicacion
);

// Rutas PUT - actualizar publicación
router.put(
    '/:id',
    validateUpdatePublicacionRequest,
    updatePublicacion
);

// Rutas PUT - activar / desactivar publicación
router.put('/:id/activar', validatePublicacionStatusChange, changePublicacionStatus);
router.put('/:id/desactivar', validatePublicacionStatusChange, changePublicacionStatus);

export default router;
