// Requiring Packages and model
const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  expressSanitizer = require("express-sanitizer"),
  session = require("express-session"),
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
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connected!!!");
  })
  .catch((err) => console.log(err));

// before session packages config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressSanitizer());

// after session packages config
app.use(
  session({
    secret: "money is good always",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(flash());
// setting global variables to display within pages
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
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
