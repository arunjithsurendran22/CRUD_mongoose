const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const e = require("express");


const app = express();
// -------------------------------------------------------------------------
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
//database connection
const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/CRUDmongoose", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to MongoDB");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(1); // Exit the process on error
  }
};
connectToDB();
// -------------------------------------------------------------------------










// ------------------------------------------------------------------------
//server creation 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
