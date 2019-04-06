const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");

require("./service/passport");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes import
const auth = require("./routes/auth");
const product = require("./routes/product");

//Database Configuration
const config = require("./service/knex");
knex = require("knex")(config); //global variable

//Tell passport use cookie for authentification
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.secretKeys]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//get routes
app.use("/api", auth);
app.use("/api/product", product);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Port on: 3000"));
