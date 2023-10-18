const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minLength: 3,
    maxLength: 20,
    trim: true,
    validate: {
      validator: function (value) {
        const nameRegex = /^[a-zA-Z\s]*$/;
        return nameRegex.test(value);
      },
      message: "First name should be alphabetic",
    },
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minLength: 3,
    maxLength: 20,
    trim: true,
    validate: {
      validator: function (value) {
        const nameRegex = /^[a-zA-Z\s]*$/;
        return nameRegex.test(value);
      },
      message: "Last name should be alphabetic",
    },
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    min:18,
    max:50
  },
});

// Define a model using the schema
const Contact = mongoose.model("users", contactSchema);

module.exports = Contact;
