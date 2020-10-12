// Requiring Packages and model
const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  expressSanitizer = require("express-sanitizer"),
  session = require("express-session"),
  flash = require("connect-flash"),
  compression = require("compression"),
  routes = require("./routes.js"); // requiring routes

app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
  //not sure if this https redirect middleware will slow down the server. I'm thinking it might, so keep eye here incase error or slow performance happens
  if (req.protocol !== "https" && process.env.NODE_ENV === "prod") {
    return res.redirect(301, `https://mavnew.herokuapp.com${req.url}`);
  }
  next();
});
// app.use((req, res, next) => {
//   if (process.env.NODE_ENV === "prod") {
//     if (req.headers.host === "www.mavnew.com")
//       return res.redirect(301, "https://mavnew.herokuapp.com");
//     if (req.headers["x-forwarded-proto"] !== "https")
//       return res.redirect("https://" + req.headers.host + req.url);
//     else return next();
//   } else return next();
// });

app.set("view engine", "ejs");
require("dotenv").config();
// require("./minify.js")();

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

app.use(compression({ filter: shouldCompress })); //compression middleware
function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    return false;
  }

  return compression.filter(req, res);
}

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
