const express = require("express");
const Animal = require("../models/animal_model");
const router = express.Router();

router.post("/add", async (req, res) => {
  const { city, category, description, mobile, parent, image } = req.body;
  const animal = new Animal({
    city,
    category,
    description,
    mobile,
    parent,
    image,
  });
  try {
    await animal.save();
    res.send("Added Succesfully");
  } catch (e) {
    res.status(400).json({ message: e });
  }
});

router.post("/animals", async (req, res) => {
  const { location } = req.body;
  if (location) {
    try {
      const animal = await Animal.find({ city: location });
      res.send(animal);
    } catch (e) {
      res.status(400).json({ message: e });
    }
  } else {
    try {
      const animal = await Animal.find({});
      res.send(animal);
    } catch (e) {
      res.status(400).json({ message: e });
    }
  }
});

router.post("/remove", async (req, res) => {
  const { id1, id2 } = req.body;
  try {
    const animal = await Animal.findOneAndDelete({ _id: id1, parent: id2 });
    res.send(animal);
  } catch (e) {
    res.status(400).send({ message: e });
  }
});

module.exports = router;
