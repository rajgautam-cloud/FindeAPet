const mongoose = require("mongoose");

const animalSchema = mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  parent: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
});

const Animal = mongoose.model("animal", animalSchema);

module.exports = Animal;
