const express = require('express');
const multer = require('multer')
const router = express.Router();
const {
  createTesis,
  getTesis,
  getTesisById,
  updateTesis,
  deleteTesis,
  downloadTesis
} = require('../controllers/tesisController');
const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
      cb(null, `${__dirname}/../uploads`)
  },
  filename: (req, file, cb)=>{
      console.log(file)
      cb(null, `${req.body.idtesis}` + '.pdf')
  }
})
const upload = multer({ storage: storage})

router.post('/', upload.single('tesis'), createTesis);
router.get('/', getTesis);
router.get('/:id', getTesisById);
router.put('/:id', updateTesis);
router.delete('/:id', deleteTesis);
router.post('/dowload/',downloadTesis);

module.exports = router;
