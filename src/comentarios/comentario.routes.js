import { Router } from 'express';
import {
    getComentarios,
    getComentarioById,
    createComentario,
    updateComentario,
    changeComentarioStatus,
} from './comentario.controller.js';
import {
    validateCreateComentario,
    validateUpdateComentarioRequest,
    validateComentarioStatusChange,
    validateGetComentarioById,
} from '../../middlewares/comentarios-validators.js';

const router = Router();

// Rutas GET
router.get('/:publicacionId', getComentarios); // Obtener comentarios de una publicación por ID
router.get('/comentario/:id', validateGetComentarioById, getComentarioById); // Obtener un comentario por ID

// Rutas POST - crear comentario
router.post(
    '/',
    validateCreateComentario,
    createComentario
);

// Rutas PUT - actualizar comentario
router.put(
    '/:id',
    validateUpdateComentarioRequest,
    updateComentario
);

// Rutas PUT - activar / desactivar comentario
router.put('/:id/activar', validateComentarioStatusChange, changeComentarioStatus);
router.put('/:id/desactivar', validateComentarioStatusChange, changeComentarioStatus);

export default router;
