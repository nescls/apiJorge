const express = require('express');
const router = express.Router();
const {
  createAutores,
  getAutores,
  getAutoresById,
  updateAutores,
  deleteAutores
} = require('../controllers/autoresController.js');

router.post('/', createAutores);
router.get('/', getAutores);
router.get('/:id', getAutoresById);
router.put('/:id', updateAutores);
router.delete('/:id', deleteAutores);

module.exports = router;
