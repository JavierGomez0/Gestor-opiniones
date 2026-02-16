import Usuarios from './usuario.model.js';

// Obtener todos los usuarios con paginación y filtros
export const getUsuarios = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
    };

    const usuarios = await Usuarios.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(options.sort);

    const total = await Usuarios.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: usuarios,
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
      message: 'Error al obtener los usuarios',
      error: error.message,
    });
  }
};

// Obtener usuario por ID
export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuarios.findById(id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: usuario,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el usuario',
      error: error.message,
    });
  }
};

// Crear nuevo usuario
export const createUsuario = async (req, res) => {
  try {
    const usuarioData = req.body;

    const usuario = new Usuarios(usuarioData);
    await usuario.save();

    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: usuario,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el usuario',
      error: error.message,
    });
  }
};

// Actualizar usuario
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const usuario = await Usuarios.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: usuario,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el usuario',
      error: error.message,
    });
  }
};

// Cambiar estado del usuario (activar/desactivar)
export const changeUsuarioStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const isActive = req.url.includes('/activar');
    const action = isActive ? 'activado' : 'desactivado';

    const usuario = await Usuarios.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: `Usuario ${action} exitosamente`,
      data: usuario,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar el estado del usuario',
      error: error.message,
    });
  }
};
