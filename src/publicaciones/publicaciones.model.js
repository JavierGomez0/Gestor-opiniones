'use strict';

import mongoose from 'mongoose';

const publicacionSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true,
        maxlength: [200, 'El título no puede tener más de 200 caracteres'],
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        trim: true,
        maxlength: [500, 'La descripción no puede tener más de 500 caracteres'],
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: [true, 'El usuario que comparte la publicación es obligatorio'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true, // Esto agregará createdAt y updatedAt automáticamente
});

publicacionSchema.index({ isActive: 1 });

export default mongoose.model('Publicaciones', publicacionSchema);
