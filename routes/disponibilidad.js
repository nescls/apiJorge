const express = require('express');
const router = express.Router();
const {
  createDisponibilidadTutor,
  getDisponibilidadTutores,
  getDisponibilidadTutorById,
  updateDisponibilidadTutor,
  deleteDisponibilidadTutor
} = require('./disponibilidadTutorController.js');

router.post('/', createDisponibilidadTutor);
router.get('/', getDisponibilidadTutores);
router.get('/:id', getDisponibilidadTutorById);
router.put('/:id', updateDisponibilidadTutor);
router.delete('/:id', deleteDisponibilidadTutor);

module.exports = router;
