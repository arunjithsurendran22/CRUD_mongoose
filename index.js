const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const contactRouter = require("./routes/contact");

const app = express();
// -------------------------------------------------------------------------
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// -------------------------------------------------------------------------



app.use("/", contactRouter);
// -------------------------------------------------------------------------
//database connection
const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/CRUDmongoose", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to MongoDB");
  } catch (err) {
    console.error(err);
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
