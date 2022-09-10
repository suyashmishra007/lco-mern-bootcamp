require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");

// ! MIDDLEWARWE
app.use(bodyParser.json()); // parse application/json
app.use(cookieParser());
app.use(cors());

// ! DB CONNECTION
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("NOT CONNECTED");
  });

// ! MY ROUTES
app.use("/api", authRoutes);

// ! PORT
const PORT = process.env.PORT || 8000;

// ! STARTING A SERVER
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
