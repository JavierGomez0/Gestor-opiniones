import Comentarios from './comentario.model.js';
import Publicaciones from '../publicaciones/publicaciones.model.js';

// Obtener todos los comentarios de una publicación con paginación y filtros
export const getComentarios = async (req, res) => {
  try {
    const { publicacionId } = req.params;  // Obtenemos el ID de la publicación
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { publicacion: publicacionId, isActive };

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
    };

    const comentarios = await Comentarios.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(options.sort);

    const total = await Comentarios.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: comentarios,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los comentarios',
      error: error.message,
    });
  }
};

// Obtener comentario por ID
export const getComentarioById = async (req, res) => {
  try {
    const { id } = req.params;

    const comentario = await Comentarios.findById(id);

    if (!comentario) {
      return res.status(404).json({
        success: false,
        message: 'Comentario no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: comentario,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el comentario',
      error: error.message,
    });
  }
};

// Crear nuevo comentario
export const createComentario = async (req, res) => {
  try {
    const { descripcion, publicacion } = req.body;

    // Verificamos que la publicación exista
    const publicacionExistente = await Publicaciones.findById(publicacion);
    if (!publicacionExistente) {
      return res.status(404).json({
        success: false,
        message: 'La publicación a la que se refiere el comentario no existe',
      });
    }

    const comentario = new Comentarios({
      descripcion,
      publicacion,
    });

    await comentario.save();

    res.status(201).json({
      success: true,
      message: 'Comentario creado exitosamente',
      data: comentario,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el comentario',
      error: error.message,
    });
  }
};

// Actualizar comentario
export const updateComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const comentario = await Comentarios.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!comentario) {
      return res.status(404).json({
        success: false,
        message: 'Comentario no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Comentario actualizado exitosamente',
      data: comentario,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el comentario',
      error: error.message,
    });
  }
};

// Cambiar estado del comentario (activar/desactivar)
export const changeComentarioStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const isActive = req.url.includes('/activar');
    const action = isActive ? 'activado' : 'desactivado';

    const comentario = await Comentarios.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!comentario) {
      return res.status(404).json({
        success: false,
        message: 'Comentario no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: `Comentario ${action} exitosamente`,
      data: comentario,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar el estado del comentario',
      error: error.message,
    });
  }
};
