const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    admin: {
      type: Boolean,
      default: false,
    },
    firstName: {
      type: String,
      required: [true, "Must submit a sir name."],
      maxlength: [100, "Too many characters."],
      minlength: [2, "Min 2 characters required."],
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: [true, "Must submit a family name."],
      maxlength: [100, "Too many characters."],
      minlength: [2, "Min 2 characters required."],
    },
    phone: {
      type: String,
      required: true,
      minlength: [6, "Phone number is not valid"],
      maxlength: [250, "Phone number is not valid"],
      match: [/^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Enter a valid phone number"]
    },
    email: {
      type: String,
      unique: true,
      maxlength: [150, "Too many characters."],
      required: [true, "Must submit an email."],
      validate: [validator.isEmail, "Please provide a valid email."],
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minlength: [8, "Min 8 characters required."],
      maxlength: [200, "Max 200 characters allowed."],
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
    business: {
      type: Boolean,
      default: false,
    },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Card'}]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
