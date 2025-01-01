const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please tell us your name!"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  message: {
    type: String,
    required: [true, "Please give a message"],
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
