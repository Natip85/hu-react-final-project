const { Event } = require('../models/Event');
const joi = require('joi');

module.exports = {
    getAll: async function (req, res, next) {
        try {
            const result = await Event.find()
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: 'error getting events' });
        }
    },


    getItem: async function (req, res, next) {
        try {
            const scheme = joi.object({
                // _id: joi.string().required(),
                title: joi.string().required(),
            });

            const { error, value } = scheme.validate({ title: req.params.title });

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const result = await Event.findOne({ title: value.title });
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error getting the event" });
        }
    },

    
    add: async function (req, res, next) {
        try {
            const scheme = joi.object({
                date: joi.string(),
                title: joi.string()
            });

            const { error, value } = scheme.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const newEvent = new Event(value);
            const result = await newEvent.save();

            res.json({
                ...value,
                _id: result._id
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error adding event" });
        }
    },

    delete: async function (req, res, next) {
        try {
            const scheme = joi.object({
                _id: joi.string().required(),
            });

            const { error, value } = scheme.validate({ _id: req.params.id });

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const deleted = await Event.findOne({ _id: value._id });

            await Event.deleteOne(value).exec();
            res.json(deleted);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error deleting event" });
        }
    },
    
}