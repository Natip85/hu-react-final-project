const Card = require("../models/Card");
const joi = require("joi");

module.exports = {
  allCards: async function (req, res, next) {
    try {
      const result = await Card.find();
      res.json(result);
      console.log(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error getting cards" });
    }
  },
  addCard: async function (req, res, next) {
    try {
      const scheme = joi.object({
        title: joi.string().required().min(2).max(30),
        subtitle: joi.string().required().min(2).max(30),
        description: joi.string().required().min(5).max(3000),
        phone: joi.string().required().min(6).max(250),
        email: joi.string().max(150).required().email(),
        web: joi.string().optional().allow(""),
        imageUrl: joi.string().optional().allow(""),
        imageAlt: joi.string().optional().allow(""),
        state: joi.string().optional().allow(""),
        country: joi.string().required(),
        city: joi.string().required(),
        street: joi.string().required(),
        houseNumber: joi.string().required(),
        zip: joi.string().optional().allow(""),
        cardNumber: joi.number(),
        userId: joi.string().optional().allow(""),
        lat: joi.number(),
        lng: joi.number(),
      });

      const { error, value } = scheme.validate(req.body);

      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const newCard = new Card(value);
      const result = await newCard.save();

      res.json({
        ...value,
        _id: result._id,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "Error adding card." + err });
    }
  },
  getOneCard: async function (req, res, next) {
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

      const result = await Card.findOne({ _id: value._id });
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error getting the card" });
    }
  },
  myCards: async function (req, res, next) {
    try {
      const scheme = joi.object({
        _id: joi.string(),
      });

      const { error, value } = scheme.validate({ _id: req.params._id });

      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }

      const result = await Card.find({ userId: value._id });
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error getting your cards" });
    }
  },
  myFavs: async function (req, res, next) {
    try {
      const scheme = joi.object({
        _id: joi.string(),
      });

      const { error, value } = scheme.validate({ _id: req.params._id });
      
      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }

      const result = await Card.find({ _id: value._id });

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error getting your cards" });
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

      const deleted = await Card.findOne({ _id: value._id });

      await Card.deleteOne(value).exec();
      res.json(deleted);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error delete vacation" });
    }
  },
  edit: async function (req, res, next) {
    try {
      const scheme = joi.object({
        title: joi.string().required().min(2).max(30),
        subtitle: joi.string().required().min(2).max(30),
        description: joi.string().required().min(5).max(3000),
        phone: joi.string().required().min(6).max(250),
        email: joi.string().max(150).required().email(),
        web: joi.string().optional().allow(""),
        imageUrl: joi.string().optional().allow(""),
        imageAlt: joi.string().optional().allow(""),
        state: joi.string().optional().allow(""),
        country: joi.string().required(),
        city: joi.string().required(),
        street: joi.string().required(),
        houseNumber: joi.string().required(),
        zip: joi.string().optional().allow(""),
      });

      const { error, value } = scheme.validate(req.body);

      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }

      const card = await Card.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        value
      );

      if (!card) return res.status(404).send("Given ID was not found.");

      const updated = await Card.findOne({ _id: req.params.id });
      res.json(updated);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "fail to update data" });
    }
  },
  favs: async function (req, res, next) {
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

      const fav = await Card.findOne({ _id: req.params.id });

      if (fav) {
        fav.favorite = !fav.favorite;
      }

      const favorite = await Card.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        fav
      );

      res.json(favorite);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "fail to update data" });
    }
  },
};
