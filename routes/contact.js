//contact routes
const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

router.post("/contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact
      .save()
      .then((savedContact) => {
        console.log(savedContact);
        res.status(201).json({ message: "contact saved succesfully" });
      })
      .catch((error) => {
        console.log(error);
        if ( error.code === 11000 &&error.keyPattern &&error.keyPattern.emailAddress) {
          res.status(500).json({ message: "Emial alredy exist" });
        } else {
          res.status(500).json({ message: "unable to create contact" });
        }
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "unable to save new contct" });
  }
});

module.exports = router;
