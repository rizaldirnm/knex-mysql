const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
const auth = require("./routes/auth");

//Database
const config = require("./config/knex");
knex = require("knex")(config); //global variable

//get routes
app.use("/api", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Port on: 3000"));
