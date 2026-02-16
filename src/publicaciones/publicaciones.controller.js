import Publicaciones from './publicaciones.model.js';

// Obtener todas las publicaciones con paginación y filtros
export const getPublicaciones = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
    };

    const publicaciones = await Publicaciones.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(options.sort)
      .populate('usuario', 'nombre apellido'); // Para obtener solo nombre y apellido del usuario

    const total = await Publicaciones.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: publicaciones,
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
      message: 'Error al obtener las publicaciones',
      error: error.message,
    });
  }
};

// Obtener publicación por ID
export const getPublicacionById = async (req, res) => {
  try {
    const { id } = req.params;

    const publicacion = await Publicaciones.findById(id).populate('usuario', 'nombre apellido');

    if (!publicacion) {
      return res.status(404).json({
        success: false,
        message: 'Publicación no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      data: publicacion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la publicación',
      error: error.message,
    });
  }
};

// Crear nueva publicación
export const createPublicacion = async (req, res) => {
  try {
    const { titulo, descripcion, usuario } = req.body;

    const publicacion = new Publicaciones({
      titulo,
      descripcion,
      usuario,
    });

    await publicacion.save();

    res.status(201).json({
      success: true,
      message: 'Publicación creada exitosamente',
      data: publicacion,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear la publicación',
      error: error.message,
    });
  }
};

// Actualizar publicación
export const updatePublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const publicacion = await Publicaciones.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!publicacion) {
      return res.status(404).json({
        success: false,
        message: 'Publicación no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Publicación actualizada exitosamente',
      data: publicacion,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar la publicación',
      error: error.message,
    });
  }
};

// Cambiar estado de la publicación (activar/desactivar)
export const changePublicacionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const isActive = req.url.includes('/activar');
    const action = isActive ? 'activada' : 'desactivada';

    const publicacion = await Publicaciones.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!publicacion) {
      return res.status(404).json({
        success: false,
        message: 'Publicación no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      message: `Publicación ${action} exitosamente`,
      data: publicacion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar el estado de la publicación',
      error: error.message,
    });
  }
};
