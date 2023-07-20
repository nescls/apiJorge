const express = require('express');
const router = express.Router();
const {
  createTutor,
  getTutors,
  getTutorById,
  updateTutor,
  deleteTutor
} = require('../controllers/tutorController');

router.post('/', createTutor);
router.get('/', getTutors);
router.get('/:id', getTutorById);
router.put('/:id', updateTutor);
router.delete('/:id', deleteTutor);

module.exports = router;
