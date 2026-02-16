'use strict';

import mongoose from 'mongoose';

const comentarioSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripción del comentario es obligatoria'],
        trim: true,
        maxlength: [500, 'La descripción no puede tener más de 500 caracteres'],
    },
    publicacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publicaciones',
        required: [true, 'La publicación a la que pertenece el comentario es obligatoria'],
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true, 
});

comentarioSchema.index({ isActive: 1 });

export default mongoose.model('Comentarios', comentarioSchema);
