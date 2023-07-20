const { Tutor } = require('../models/tutor');
const { DisponibilidadTutor } = require('../models/disponibilidad_tutor');

const createTutor = async (req, res) => {
  try {
    const { name, titulo } = req.body;
    const tutor = await Tutor.create({ name, titulo });
    res.status(201).json(tutor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTutors = async (req, res) => {
  try {
    const tutors = await Tutor.findAll({
      include: [
        { model: DisponibilidadTutor, as: 'disponibilidad' }
      ]
    });
    res.status(200).json(tutors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTutorById = async (req, res) => {
  try {
    const { id } = req.params;
    const tutor = await Tutor.findOne({
      where: { id },
      include: [
        { model: DisponibilidadTutor, as: 'disponibilidad' }
      ]
    });
    if (tutor) {
      res.status(200).json(tutor);
    } else {
      res.status(404).json({ message: 'Tutor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Tutor.update(req.body, { where: { id } });
    if (updated) {
      const updatedTutor = await Tutor.findOne({ where: { id } });
      res.status(200).json(updatedTutor);
    } else {
      res.status(404).json({ message: 'Tutor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Tutor.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send('Tutor deleted');
    } else {
      res.status(404).json({ message: 'Tutor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTutor,
  getTutors,
  getTutorById,
  updateTutor,
  deleteTutor
};
