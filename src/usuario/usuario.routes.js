import { Router } from 'express';
import {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    changeUsuarioStatus,
} from './usuario.controller.js';
import {
    validateCreateUsuario,
    validateUpdateUsuarioRequest,
    validateUsuarioStatusChange,
    validateGetUsuarioById,
} from '../../middlewares/usuario-validators.js';

const router = Router();

// Rutas GET
router.get('/', getUsuarios);
router.get('/:id', validateGetUsuarioById, getUsuarioById);

// Rutas POST - crear usuario
router.post(
    '/',
    validateCreateUsuario,
    createUsuario
);

// Rutas PUT - actualizar usuario
router.put(
    '/:id',
    validateUpdateUsuarioRequest,
    updateUsuario
);

// Rutas PUT - activar / desactivar usuario
router.put('/:id/activar', validateUsuarioStatusChange, changeUsuarioStatus);
router.put('/:id/desactivar', validateUsuarioStatusChange, changeUsuarioStatus);

export default router;
