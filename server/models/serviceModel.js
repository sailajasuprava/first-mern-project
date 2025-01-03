const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  service: { type: String, required: [true, "This field is required!"] },
  description: { type: String, required: [true, "This field is required!"] },
  price: { type: String, required: [true, "This field is required!"] },
  provider: { type: String, required: [true, "This field is required!"] },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
