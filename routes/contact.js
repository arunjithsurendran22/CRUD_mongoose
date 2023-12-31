//contact routes
const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

//POST DATA ON MONGO

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
        if (
          error.code === 11000 &&
          error.keyPattern &&
          error.keyPattern.emailAddress
        ) {
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

//GET ALL DATA ON MONGO
router.get("/contact", async (req, res) => {
  try {
    Contact.find().then((contacts) => {
      console.log(contacts);
      res.status(200).json({ contacts: contacts });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "unable to get contact" });
  }
});

//GET A SPECIFIC DATA SIGLE DATA ON MONGO USING ID
router.get("/contact/:id", async (req, res) => {
  try {
    const id = req.params.id;
    Contact.findById(id)
      .then((contacts) => {
        console.log(contacts);
        res.status(200).json({ contacts: contacts });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "unable to get contact" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "unable to get data you are searched" });
  }
});

//GET METHDO SEARCH  USING SEARCH
router.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const searchRegex = new RegExp(searchTerm, "i");
    await Contact.find({
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { emailAddress: searchRegex },
      ],
    })
      .then((contacts) => {
        if (contacts.length) {
          res.status(200).json({ contacts: contacts });
        } else {
          res
            .status(200)
            .json({ contacts: [], message: "no matching contact" });
        }
        console.log(contacts);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "unable to get data you are searched" });
  }
});

//PUT UPDATE METHOD
router.put("/contact/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedContent = req.body;
    await Contact.findOneAndUpdate({ _id: id }, updatedContent, { new: true })
      .then((updatedContent) => {
        console.log(updatedContent);
        res.status(200).json({ message: "updated succesfully", contacts: updatedContent });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "unable to update" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "unable to update" });
  }
});

module.exports = router;
