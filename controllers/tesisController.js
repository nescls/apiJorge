const { Tesis } = require('../models/tesis.js');
const { Tutor } = require('../models/tutor.js');
const { User } = require('../models/users.js');
const { Objetivo } = require('../models/objetivo.js');
const { Autores } = require('../models/autores.js');
const { Facultad } = require('../models/facultad.js');
const { Escuela } = require('../models/escuela.js');
const multer = require('multer')
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
      cb(null, `${__dirname}/uploads`)
  },
  filename: (req, file, cb)=>{
      console.log(file)
      cb(null, `${req.body.idtesis}` + '.pdf')
  }
})
const upload = multer({ storage: storage})


const downloadTesis = async (req, res) =>  {
  const {idtesis}=req.body;
  const filePath = path.join(`${__dirname}/../`, 'uploads', `${idtesis}.pdf`);
  const file = fs.readFileSync(filePath);
  res.status(201).json({file: file.toString('base64')})
}

const createTesis = async (req, res) => {
  try {
    const { titulo, resumen, fecha_publicacion, estatus = "Por Aprobar", tutor_id, correo, facultad_id, escuela_id, idtesis, objetivosEspecificos, autores , objetivoGeneral} = req.body;
    if (tutor_id) {
      
      const tutor = await Tutor.findOne({ where: { id: tutor_id } });
      if (!tutor) {
        return res.status(404).json({ message: 'Tutor not found' });
      }
    }
    
    if (facultad_id) {
      const facultad = await Facultad.findOne({ where: { id: facultad_id } });
      if (!facultad) {
        return res.status(404).json({ message: 'Facultad not found' });
      }
    }
    if (escuela_id) {
      const escuela = await Escuela.findOne({ where: { id: escuela_id } });
      if (!escuela) {
        return res.status(404).json({ message: 'Escuela not found' });
      }
    }
    const pdfUrl = path.join(`${__dirname}/../`, 'uploads', `${idtesis}.pdf`);
    const codigoQr = await QRCode.toDataURL(pdfUrl);

    const tesis = await Tesis.create({ titulo, resumen, fecha_publicacion, codigoQr, estatus, tutor_id, facultad_id, escuela_id, correo, idtesis });

    await Objetivo.create({objetivoGeneral, tipo_objetivo: "General", idTesis: tesis.id})

    objetivosEspecificosJson = JSON.parse(objetivosEspecificos)
    console.log(objetivosEspecificosJson);

    for (const objetivo of objetivosEspecificosJson) {
      try {
        await Objetivo.create({descripcion: objetivo.val, tipo_objetivo: "Especifico", tesis_id: tesis.id})
      } catch (error) {
        console.error(error);
      }
   }

   autoresJson = JSON.parse(autores)

   for (const autor of autoresJson) {
     try {
       await Autores.create({nombre: autor.val, tesis_id: tesis.id})
     } catch (error) {
       console.error(error);
     }
  }

    res.status(201).json(tesis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getTesis = async (req, res) => {
  try {
    console.log(req.query)

    const whereClause = {};
    if (req.query.titulo) whereClause.titulo = req.query.titulo;
    if (req.query.resumen) whereClause.resumen = req.query.resumen;
    if (req.query.fecha_publicacion) whereClause.fecha_publicacion = req.query.fecha_publicacion;
    if (req.query.codigoQr) whereClause.codigoQr = req.query.codigoQr;
    if (req.query.estatus) whereClause.estatus = req.query.estatus;
    if (req.query.tutor) whereClause.tutor = req.query.tutor;
    if (req.query.user_id) whereClause.user_id = req.query.user_id;
    if (req.query.facultad_id) whereClause.facultad_id = req.query.facultad_id;
    if (req.query.escuela_id) whereClause.escuela_id = req.query.escuela_id;

    const tesis = await Tesis.findAll({
      where: whereClause,
      include: [
        
        /* { model: Facultad, as: 'facultad' },
        { model: Escuela, as: 'escuela' } */
      ]
    });
    res.status(200).json(tesis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTesisById = async (req, res) => {
  try {
    const { id } = req.params;
    const tesis = await Tesis.findOne({
      where: { id },
      include: [
        
        /* { model: User, as: 'user' },
        { model: Facultad, as: 'facultad' },
        { model: Escuela, as: 'escuela' } */
      ]
    });
    if (tesis) {
      res.status(200).json(tesis);
    } else {
      res.status(404).json({ message: 'Tesis not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTesis = async (req, res) => {
  try {
    const { id } = req.params;
    const { tutor_id, user_id, facultad_id, escuela_id } = req.body;
    if (tutor_id) {
      const tutor = await Tutor.findOne({ where: { id: tutor_id } });
      if (!tutor) {
        return res.status(404).json({ message: 'Tutor not found' });
      }
    }
    if (user_id) {
      const user = await User.findOne({ where: { id: user_id } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    }
    if (facultad_id) {
      const facultad = await Facultad.findOne({ where: { id: facultad_id } });
      if (!facultad) {
        return res.status(404).json({ message: 'Facultad not found' });
      }
    }
    if (escuela_id) {
      const escuela = await Escuela.findOne({ where: { id: escuela_id } });
      if (!escuela) {
        return res.status(404).json({ message: 'Escuela not found' });
      }
    }
    const [updated] = await Tesis.update(req.body, { where: { id } });
    if (updated) {
      const updatedTesis = await Tesis.findOne({ where: { id } });
      res.status(200).json(updatedTesis);
    } else {
      res.status(404).json({ message: 'Tesis not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTesis = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Tesis.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send('Tesis deleted');
    } else {
      res.status(404).json({ message: 'Tesis not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTesis,
  getTesis,
  getTesisById,
  deleteTesis,
  updateTesis,
  downloadTesis
};
