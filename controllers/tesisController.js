const { Tesis } = require('../models/tesis.js');
const { Tutor } = require('../models/tutor.js');
const { User } = require('../models/users.js');
const { Facultad } = require('../models/facultad.js');
const { Escuela } = require('../models/escuela.js');

const createTesis = async (req, res) => {
  try {
    const { titulo, resumen, fecha_publicacion, codigoQr, estatus, tutor_id, user_id, facultad_id, escuela_id } = req.body;
    if (tutor_id) {
      const tutor = await Tutor.findOne({ where: { id: tutor_id } });
      if (!tutor) {
        return res.status(404).json({ message: 'Tutor not found' });
      }
    }
    if (user_id) {
      const user = await User.findOne({ where: { id: user_id } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    }
    if (facultad_id) {
      const facultad = await Facultad.findOne({ where: { id: facultad_id } });
      if (!facultad) {
        return res.status(404).json({ message: 'Facultad not found' });
      }
    }
    if (escuela_id) {
      const escuela = await Escuela.findOne({ where: { id: escuela_id } });
      if (!escuela) {
        return res.status(404).json({ message: 'Escuela not found' });
      }
    }
    const tesis = await Tesis.create({ titulo, resumen, fecha_publicacion, codigoQr, estatus, tutor_id, user_id, facultad_id, escuela_id });
    res.status(201).json(tesis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTesis = async (req, res) => {
  try {
    const tesis = await Tesis.findAll({
      include: [
        { model: Tutor, as: 'tutor' },
        { model: User, as: 'user' },
        { model: Facultad, as: 'facultad' },
        { model: Escuela, as: 'escuela' }
      ]
    });
    res.status(200).json(tesis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTesisById = async (req, res) => {
  try {
    const { id } = req.params;
    const tesis = await Tesis.findOne({
      where: { id },
      include: [
        { model: Tutor, as: 'tutor' },
        { model: User, as: 'user' },
        { model: Facultad, as: 'facultad' },
        { model: Escuela, as: 'escuela' }
      ]
    });
    if (tesis) {
      res.status(200).json(tesis);
    } else {
      res.status(404).json({ message: 'Tesis not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTesis = async (req, res) => {
  try {
    const { id } = req.params;
    const { tutor_id, user_id, facultad_id, escuela_id } = req.body;
    if (tutor_id) {
      const tutor = await Tutor.findOne({ where: { id: tutor_id } });
      if (!tutor) {
        return res.status(404).json({ message: 'Tutor not found' });
      }
    }
    if (user_id) {
      const user = await User.findOne({ where: { id: user_id } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    }
    if (facultad_id) {
      const facultad = await Facultad.findOne({ where: { id: facultad_id } });
      if (!facultad) {
        return res.status(404).json({ message: 'Facultad not found' });
      }
    }
    if (escuela_id) {
      const escuela = await Escuela.findOne({ where: { id: escuela_id } });
      if (!escuela) {
        return res.status(404).json({ message: 'Escuela not found' });
      }
    }
    const [updated] = await Tesis.update(req.body, { where: { id } });
    if (updated) {
      const updatedTesis = await Tesis.findOne({ where: { id } });
      res.status(200).json(updatedTesis);
    } else {
      res.status(404).json({ message: 'Tesis not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTesis = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Tesis.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send('Tesis deleted');
    } else {
      res.status(404).json({ message: 'Tesis not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTesis,
  getTesis,
  getTesisById,
  deleteTesis,
  updateTesis
};
