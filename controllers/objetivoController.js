const { Objetivo } = require('../models/objetivo.js');

const ObjetivoController = {
    async create(req, res) {
        try {
            const objetivo = await Objetivo.create(req.body);
            res.status(201).send(objetivo);
        } catch (e) {
            res.status(400).send(e);
        }
    },
    async getAll(req, res) {
        try {
            const objetivos = await Objetivo.findAll();
            res.status(200).send(objetivos);
        } catch (e) {
            res.status(400).send(e);
        }
    },
    async getById(req, res) {
        try {
            const objetivo = await Objetivo.findByPk(req.params.id);
            if (!objetivo) {
                return res.status(404).send({ message: 'Objetivo not found' });
            }
            res.status(200).send(objetivo);
        } catch (e) {
            res.status(400).send(e);
        }
    },
    async update(req, res) {
        try {
            const objetivo = await Objetivo.findByPk(req.params.id);
            if (!objetivo) {
                return res.status(404).send({ message: 'Objetivo not found' });
            }
            await objetivo.update(req.body);
            res.status(200).send(objetivo);
        } catch (e) {
            res.status(400).send(e);
        }
    },
    async delete(req, res) {
        try {
            const objetivo = await Objetivo.findByPk(req.params.id);
            if (!objetivo) {
                return res.status(404).send({ message: 'Objetivo not found' });
            }
            await objetivo.destroy();
            res.status(204).send();
        } catch (e) {
            res.status(400).send(e);
        }
    }
}

module.exports = ObjetivoController;
