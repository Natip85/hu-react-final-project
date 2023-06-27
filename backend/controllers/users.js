const User = require("../models/User");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/dev");

const signToken = (_id) => {
  return jwt.sign({ _id }, config.jwt_token, {expiresIn: "72800s"});
};

module.exports = {
  allUsers: async function (req, res, next) {
    try {
      const result = await User.find();
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error getting users" });
    }
  },
  myUser: async function (req, res, next) {
    try {
      const scheme = joi.object({
        _id: joi.string(),
      });

      const { error, value } = scheme.validate({ _id: req.params.id });
      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }

      const result = await User.find({ _id: value._id });

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error getting user" });
    }
  },
  edit: async function (req, res, next) {
    try {
      const scheme = joi.object({
        // admin: joi.boolean(),
        firstName: joi.string().required().min(2).max(100),
        middleName: joi.string().optional().allow(""),
        lastName: joi.string().required().min(2).max(100),
        phone: joi.string().required().min(6).max(250),
        //   email: joi.string().max(150).required().email(),
        //   password: joi.string().min(8).max(200).required(),
        imageUrl: joi.string().optional().allow(""),
        imageAlt: joi.string().optional().allow(""),
        state: joi.string().optional().allow(""),
        country: joi.string().required(),
        city: joi.string().required(),
        street: joi.string().required(),
        houseNumber: joi.string().required(),
        zip: joi.string().optional().allow(""),
        business: joi.boolean(),
        //   lat: joi.number(),
        //   lng: joi.number(),
      });

      const { error, value } = scheme.validate(req.body);

      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }

      const user = await User.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        value
      );

      if (!user) return res.status(404).send("Given ID was not found.");

      const updated = await User.findOne({ _id: req.params.id });
      res.json(updated);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "fail to update data" });
    }
  },
  signup: async function (req, res, next) {
    const schema = joi.object({
      admin: joi.boolean(),
      firstName: joi.string().required().min(2).max(100),
      middleName: joi.string().optional().allow(""),
      lastName: joi.string().required().min(2).max(100),
      phone: joi.string().required().min(6).max(250),
      email: joi.string().max(150).required().email(),
      password: joi.string().required().min(8).max(200),
      imageUrl: joi.string().optional().allow(""),
      imageAlt: joi.string().optional().allow(""),
      state: joi.string().optional().allow(""),
      country: joi.string().required(),
      city: joi.string().required(),
      street: joi.string().required(),
      houseNumber: joi.string().required(),
      zip: joi.string().optional().allow(""),
      business: joi.boolean(),
      lat: joi.number(),
      lng: joi.number(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      console.log(error.details[0].message);
      res.status(400).json({ error: error.details[0].message});
      return;
    }
    try {
      const user = await User.findOne({ email: value.email });
      if (user) {
        return res.status(400).json({ error: "User already registered." });
      }

      const hash = await bcrypt.hash(value.password, 10);

      const newUser = new User({
        firstName: value.firstName,
        middleName: value.middleName,
        lastName: value.lastName,
        middleName: value.middleName,
        phone: value.phone,
        email: value.email,
        password: hash,
        imageUrl: value.imageUrl,
        imageAlt: value.imageAlt,
        state: value.state,
        country: value.country,
        city: value.city,
        street: value.street,
        houseNumber: value.houseNumber,
        zip: value.zip,
        business: value.business,
        lat: value.lat,
        lng: value.lng,
      });

      await newUser.save();

      res.json({
        _id: newUser._id,
        admin: newUser.admin,
        firstName: newUser.firstName,
        middleName: newUser.middleName,
        lastName: newUser.lastName,
        phone: newUser.phone,
        email: newUser.email,
        imageUrl: newUser.imageUrl,
        state: newUser.state,
        country: newUser.country,
        city: newUser.city,
        street: newUser.street,
        houseNumber: newUser.houseNumber,
        zip: newUser.zip,
        business: newUser.business,
        isBlocked: newUser.isBlocked,
      });
    } catch (err) {
      console.log(err.message);
      res
        .status(400)
        .json({ error: "error signing up new user" + err.message });
    }
  },
  login: async function (req, res, next) {
    const schema = joi.object({
      email: joi.string().required().max(150).email(),
      password: joi.string().required().min(8).max(200),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      console.log(error.details[0].message);
      res.status(401).send("Unauthorized");
      return;
    }

    try {
      const user = await User.findOne({ email: value.email });
      if (!user) throw Error;

      if (user.loginAttempts >= 2) {
        user.isBlocked = true;
        await user.save();
      }

      if (user.isBlocked === true) {
        throw "Account blocked";
      }

      const validPassword = await bcrypt.compare(value.password, user.password);
      if (!validPassword) throw "Invalid login details";

      user.loginAttempts = 0;
      await user.save();
// console.log(user._id);
      // const param = { email: value.email };
      // const token = jwt.sign(param, config.jwt_token, { expiresIn: "72800s" });
//       const user_id = req.user
// req.user = user
// console.log(req.token);
const token = signToken(user._id);

      res.json({
        token: token,
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        admin: user.admin,
        business: user.business,
        isBlocked: user.isBlocked,
        favorites: user.favorites
      });
    } catch (err) {
      const user = await User.findOne({ email: req.body.email });

      if (user == null) {
        res.status(400).json({ error: "User doesnt exist." });
      }

      if (user) {
        user.loginAttempts += 1;
        await user.save();
        res.status(400).json({ error: "Log in details do not match", err });
      }
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

      const deleted = await User.findOne({ _id: value._id });

      await User.deleteOne(value).exec();
      res.json(deleted);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error delete vacation" });
    }
  },
};
