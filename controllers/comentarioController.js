const { Comentario } = require('../models/comentario.js');
const { User } = require('../models/users.js');

const createComentario = async (req, res) => {
  try {
    const { user_id, name, coment } = req.body;
    if (user_id) {
      const user = await User.findOne({ where: { id: user_id } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    }
    const comentario = await Comentario.create({ user_id, name, coment });
    res.status(201).json(comentario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.findAll();
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComentarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const comentario = await Comentario.findOne({ where: { id } });
    if (comentario) {
      res.status(200).json(comentario);
    } else {
      res.status(404).json({ message: 'Comentario not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;
    if (user_id) {
      const user = await User.findOne({ where: { id: user_id } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    }
    const [updated] = await Comentario.update(req.body, { where: { id } });
    if (updated) {
      const updatedComentario = await Comentario.findOne({ where: { id } });
      res.status(200).json(updatedComentario);
    } else {
      res.status(404).json({ message: 'Comentario not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Comentario.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send('Comentario deleted');
    } else {
      res.status(404).json({ message: 'Comentario not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createComentario,
  getComentarios,
  getComentarioById,
  updateComentario,
  deleteComentario
};
