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

//GET A SPECIFIC DATA SIGLE DATA ON MONGO
router.get('/contact/:id',async(req,res)=>{
    try{
        const id=req.params.id
        Contact.findById(id)
        .then((contacts)=>{
            
        })
 
    }catch(err){
        console.log(err);
        res.status(500).json({message:'unable to get data you are searched'})
    }
})


module.exports = router;
