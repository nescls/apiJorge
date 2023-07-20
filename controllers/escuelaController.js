const { Escuela } = require('../models/escuela.js');

const createEscuela = async (req, res) => {
  try {
    const { name } = req.body;
    const escuela = await Escuela.create({ name });
    res.status(201).json(escuela);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEscuelas = async (req, res) => {
  try {
    const escuelas = await Escuela.findAll();
    res.status(200).json(escuelas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEscuelaById = async (req, res) => {
  try {
    const { id } = req.params;
    const escuela = await Escuela.findOne({ where: { id } });
    if (escuela) {
      res.status(200).json(escuela);
    } else {
      res.status(404).json({ message: 'Escuela not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEscuela = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Escuela.update(req.body, { where: { id } });
    if (updated) {
      const updatedEscuela = await Escuela.findOne({ where: { id } });
      res.status(200).json(updatedEscuela);
    } else {
      res.status(404).json({ message: 'Escuela not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEscuela = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Escuela.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send('Escuela deleted');
    } else {
      res.status(404).json({ message: 'Escuela not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEscuela,
  getEscuelas,
  getEscuelaById,
  updateEscuela,
  deleteEscuela
};
