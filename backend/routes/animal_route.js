const express = require("express");
const Animal = require("../models/animal_model");
const router = express.Router();
const sharp = require("sharp");
const fileUpload = require("express-fileupload");

router.post("/add", async (req, res) => {
  const { city, description, mobile, parent, image } = req.body;
  const Animal = new Animal({
    city,
    description,
    mobile,
    parent,
    image,
  });
  try {
    await Animal.save();
    res.send("Added Succesfully");
  } catch (e) {
    res.status(400).json({ message: e });
  }
});

router.post("/animals", async (req, res) => {
  const { location } = req.body;
  if (location) {
    try {
      const Animal = await Animal.find({ city: location });
      res.send(Animal);
    } catch (e) {
      res.status(400).json({ message: e });
    }
  } else {
    try {
      const Animal = await Animal.find({});
      res.send(Animal);
    } catch (e) {
      res.status(400).json({ message: e });
    }
  }
});

router.post("/remove", async (req, res) => {
  const { id1, id2 } = req.body;
  try {
    const Animal = await Animal.findOneAndDelete({ _id: id1, parent: id2 });
    res.send(Animal);
  } catch (e) {
    res.status(400).send({ message: e });
  }
});

module.exports = router;
