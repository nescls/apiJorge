const { DisponibilidadTutor } = require('./disponibilidad_tutor.js');
const { Tutor } = require('./tutor.js');

const createDisponibilidadTutor = async (req, res) => {
  try {
    const { dias, hora, turno, tutor_id } = req.body;
    if (tutor_id) {
      const tutor = await Tutor.findOne({ where: { id: tutor_id } });
      if (!tutor) {
        return res.status(404).json({ message: 'Tutor not found' });
      }
    }
    const disponibilidadTutor = await DisponibilidadTutor.create({ dias, hora, turno, tutor_id });
    res.status(201).json(disponibilidadTutor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDisponibilidadTutores = async (req, res) => {
  try {
    const disponibilidadTutores = await DisponibilidadTutor.findAll();
    res.status(200).json(disponibilidadTutores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDisponibilidadTutorById = async (req, res) => {
  try {
    const { id } = req.params;
    const disponibilidadTutor = await DisponibilidadTutor.findOne({ where: { id } });
    if (disponibilidadTutor) {
      res.status(200).json(disponibilidadTutor);
    } else {
      res.status(404).json({ message: 'Disponibilidad Tutor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDisponibilidadTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const { tutor_id } = req.body;
    if (tutor_id) {
      const tutor = await Tutor.findOne({ where: { id: tutor_id } });
      if (!tutor) {
        return res.status(404).json({ message: 'Tutor not found' });
      }
    }
    const [updated] = await DisponibilidadTutor.update(req.body, { where: { id } });
    if (updated) {
      const updatedDisponibilidadTutor = await DisponibilidadTutor.findOne({ where: { id } });
      res.status(200).json(updatedDisponibilidadTutor);
    } else {
      res.status(404).json({ message: 'Disponibilidad Tutor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDisponibilidadTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await DisponibilidadTutor.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send('Disponibilidad Tutor deleted');
    } else {
      res.status(404).json({ message: 'Disponibilidad Tutor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDisponibilidadTutor,
  getDisponibilidadTutores,
  getDisponibilidadTutorById,
  updateDisponibilidadTutor,
  deleteDisponibilidadTutor
};
