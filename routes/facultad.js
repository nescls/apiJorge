const express = require('express');
const router = express.Router();
const {
  createFacultad,
  getFacultades,
  getFacultadById,
  updateFacultad,
  deleteFacultad
} = require('../controllers/facultadController');

router.post('/', createFacultad);
router.get('/', getFacultades);
router.get('/:id', getFacultadById);
router.put('/:id', updateFacultad);
router.delete('/:id', deleteFacultad);

module.exports = router;
