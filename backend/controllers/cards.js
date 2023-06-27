const Card = require("../models/Card");
const User = require("../models/User");
const joi = require("joi");

module.exports = {
  allCards: async function (req, res, next) {
    try {
      const result = await Card.find();
      res.json(result);
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
  // myFavs: async function (req, res, next) {
  //   try {
  //     const scheme = joi.object({
  //       _id: joi.string(),
  //     });

  //     const { error, value } = scheme.validate({ _id: req.params._id });

  //     if (error) {
  //       console.log(error.details[0].message);
  //       res.status(400).json({ error: "invalid data" });
  //       return;
  //     }

  //     const result = await Card.find({ _id: value._id });

  //     res.json(result);
  //   } catch (err) {
  //     console.log(err);
  //     res.status(400).json({ error: "error getting your cards" });
  //   }
  // },
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
  getUserFavoriteCards: async function (req, res, next) {
    try {
      // console.log(req.user);
      const user = await User.findById(req.user._id).populate('favorites');
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      
      const favoriteCards = user.favorites

      return res.status(200).json( favoriteCards );
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  },
  setFavorite: async function (req, res, next) {
    const cardId = req.params.id;
    const userId = req.user._id;
    let status = false;
// console.log(req.user.id);
    try {
      const card = await Card.findById(cardId);
      const user = await User.findById(userId);
      if (!card) {
        return res.status(404).json({ message: "Card not found" });
      }

      const cardIndex = card.favorites.indexOf(userId);
      const userIndex = user.favorites.indexOf(cardId);

      if (cardIndex === -1) {
        card.favorites.push(userId);
        status = true;
      } else {
        card.favorites.splice(cardIndex, 1);
        status = false;
      }

      if (userIndex === -1) {
        user.favorites.push(cardId);
      } else {
        user.favorites.splice(userIndex, 1);
      }

      await card.save();
      await user.save();
      const { title } = card;

      return res.status(200).json({ title, status });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  },
//   removeFavorite: async function (req, res, next) {
//     const cardId = req.params.id;
//     const userId = req.user._id;
//     let status = false;
// // console.log(req.user.id);
//     try {
//       const card = await Card.findById(cardId);
//       const user = await User.findById(userId);
//       if (!card) {
//         return res.status(404).json({ message: "Card not found" });
//       }

//       const cardIndex = card.favorites.indexOf(userId);
//       const userIndex = user.favorites.indexOf(cardId);

//       if (cardIndex === -1) {
//         card.favorites.push(userId);
//         status = true;
//       } else {
//         card.favorites.slice(cardIndex, 1);
//         status = false;
//       }

//       if (userIndex === -1) {
//         user.favorites.push(cardId);
//       } else {
//         user.favorites.slice(userIndex, 1);
//       }

//       await card.save();
//       await user.save();
//       const { title } = card;

//       return res.status(200).json({ title, status });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         status: "fail",
//         message: err.message,
//       });
//     }
//   },
};
