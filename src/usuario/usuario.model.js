'use streict';

import mongoose from "mongoose";

const usuariosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        required: true,
        maxlength: [100, 'El nombre no puede tener más de 100 caracteres'],
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        required: true,
        maxlength: [100, 'El apellido no puede tener más de 100 caracteres'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        required: true,
        unique: true,
        trim: true,
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        required: true,
        minlength: [100, 'La contraseña debe tener al menos 100 caracteres'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

usuariosSchema.index({ isActive: 1 });

export default mongoose.model('Usuarios', usuariosSchema);
