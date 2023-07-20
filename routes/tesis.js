const express = require('express');
const router = express.Router();
const {
  createTesis,
  getTesis,
  getTesisById,
  updateTesis,
  deleteTesis
} = require('../controllers/tesisController');

router.post('/', createTesis);
router.get('/', getTesis);
router.get('/:id', getTesisById);
router.put('/:id', updateTesis);
router.delete('/:id', deleteTesis);

module.exports = router;
