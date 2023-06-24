const { string } = require("joi");
const mongoose = require("mongoose");
const validator = require("validator");

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      minlength: [2, "Title must be at least 2 characters long."],
      maxlength: [30, "Title must be under 30 characters."],
    },
    subtitle: {
      type: String,
      required: [true, "Please provide a title"],
      minlength: [2, "Title must be at least 2 characters long."],
      maxlength: [30, "Title must be under 30 characters."],
    },
    description: {
      type: String,
      minlength: [5, "Description must be at least 5 characters long."],
      maxlength: [3000, "Max 3000 characters allowed."],
    },
    phone: {
      type: String,
      minlength: [6, "Phone number is not valid"],
      maxlength: [250, "Phone number is not valid"],
      match: [
        /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        "Enter a valid phone number",
      ],
    },
    email: {
      type: String,
      unique: true,
      maxlength: [150, "Too many characters."],
      required: [true, "Must submit an email."],
      validate: [validator.isEmail, "Please provide a valid email."],
    },
    web: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    imageAlt: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    houseNumber: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
    },
    cardNumber: {
      type: Number,
      unique: [true, "Card number already exists"],
      default: () => Math.floor(100000 + Math.random() * 900000),
    },
    userId: {
      type: String,
    },
    lat: {
      type: Number
    },
    lng: {
      type: Number
    },
    favorite: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
