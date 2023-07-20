const { Autores } = require('../models/autores.js');
const { Tesis } = require('../models/tesis.js');

const createAutores = async (req, res) => {
  try {
    const { name, apellido, cedula, tesis_id } = req.body;
    if (tesis_id) {
      const tesis = await Tesis.findOne({ where: { id: tesis_id } });
      if (!tesis) {
        return res.status(404).json({ message: 'Tesis not found' });
      }
    }
    const autores = await Autores.create({ name, apellido, cedula, tesis_id });
    res.status(201).json(autores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAutores = async (req, res) => {
  try {
    const autores = await Autores.findAll();
    res.status(200).json(autores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAutoresById = async (req, res) => {
  try {
    const { id } = req.params;
    const autores = await Autores.findOne({ where: { id } });
    if (autores) {
      res.status(200).json(autores);
    } else {
      res.status(404).json({ message: 'Autores not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAutores = async (req, res) => {
  try {
    const { id } = req.params;
    const { tesis_id } = req.body;
    if (tesis_id) {
      const tesis = await Tesis.findOne({ where: { id: tesis_id } });
      if (!tesis) {
        return res.status(404).json({ message: 'Tesis not found' });
      }
    }
    const [updated] = await Autores.update(req.body, { where: { id } });
    if (updated) {
      const updatedAutores = await Autores.findOne({ where: { id } });
      res.status(200).json(updatedAutores);
    } else {
      res.status(404).json({ message: 'Autores not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAutores = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Autores.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send('Autores deleted');
    } else {
      res.status(404).json({ message: 'Autores not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAutores,
  getAutores,
  getAutoresById,
  updateAutores,
  deleteAutores
};
