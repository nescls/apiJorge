const express = require('express');
const router = express.Router();
const {
  createEscuela,
  getEscuelas,
  getEscuelaById,
  updateEscuela,
  deleteEscuela
} = require('../controllers/escuelaController.js');

router.post('/', createEscuela);
router.get('/', getEscuelas);
router.get('/:id', getEscuelaById);
router.put('/:id', updateEscuela);
router.delete('/:id', deleteEscuela);

module.exports = router;
