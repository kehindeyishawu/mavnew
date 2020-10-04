// Requiring Packages and model
const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  session = require("express-session"),
  bodyParser = require("body-parser"),
  flash = require("connect-flash"),
  routes = require("./routes.js"); // requiring routes

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
require("dotenv").config();

// connecting to database
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected!!!");
  })
  .catch((err) => console.log(err));

// before session packages config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// after session packages config
app.use(
  session({
    secret: "money is super good",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(flash());

// Using routes
app.use(routes);

// 404 route
app.use((req, res, next) => {
  res.status(404).render("pages/not-found");
});

// start server
app.listen(process.env.PORT || 3000, () => {
  console.log("server has started running");
});
