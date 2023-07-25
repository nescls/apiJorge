const express = require('express');
const router = express.Router();
const ObjetivoController = require('../controllers/objetivoController.js');

router.post('/', ObjetivoController.create);
router.get('/', ObjetivoController.getAll);
router.get('/:id', ObjetivoController.getById);
router.put('/:id', ObjetivoController.update);
router.delete('/:id', ObjetivoController.delete);

module.exports = router;
