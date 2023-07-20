const express = require('express');
const router = express.Router();
const {
  createComentario,
  getComentarios,
  getComentarioById,
  updateComentario,
  deleteComentario
} = require('../controllers/comentarioController.js');

router.post('/', createComentario);
router.get('/', getComentarios);
router.get('/:id', getComentarioById);
router.put('/:id', updateComentario);
router.delete('/:id', deleteComentario);

module.exports = router;
