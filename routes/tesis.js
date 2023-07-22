const express = require('express');
const router = express.Router();
const {
  createTesis,
  getTesis,
  getTesisById,
  updateTesis,
  deleteTesis,
  downloadTesis
} = require('../controllers/tesisController');

router.post('/', createTesis);
router.get('/', getTesis);
router.get('/:id', getTesisById);
router.put('/:id', updateTesis);
router.delete('/:id', deleteTesis);
router.get('/dowload/:id',downloadTesis);

module.exports = router;
