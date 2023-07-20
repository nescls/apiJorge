const { Facultad } = require('./facultadController.js');

const createFacultad = async (req, res) => {
  try {
    const { name } = req.body;
    const facultad = await Facultad.create({ name });
    res.status(201).json(facultad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFacultades = async (req, res) => {
  try {
    const facultades = await Facultad.findAll();
    res.status(200).json(facultades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFacultadById = async (req, res) => {
  try {
    const { id } = req.params;
    const facultad = await Facultad.findOne({ where: { id } });
    if (facultad) {
      res.status(200).json(facultad);
    } else {
      res.status(404).json({ message: 'Facultad not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFacultad = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Facultad.update(req.body, { where: { id } });
    if (updated) {
      const updatedFacultad = await Facultad.findOne({ where: { id } });
      res.status(200).json(updatedFacultad);
    } else {
      res.status(404).json({ message: 'Facultad not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFacultad = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Facultad.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send('Facultad deleted');
    } else {
      res.status(404).json({ message: 'Facultad not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createFacultad,
  getFacultades,
  getFacultadById,
  updateFacultad,
  deleteFacultad
};
