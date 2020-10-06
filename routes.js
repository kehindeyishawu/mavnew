const express = require("express"),
  router = express.Router(),
  axios = require("axios").default,
  crypto = require("crypto"),
  { Post, Newsletter } = require("./models");

require("dotenv").config(); // env variables
const sendinblue = axios.create({
  baseURL: "https://api.sendinblue.com/v3",
  headers: {
    "api-key": process.env.SENDINBLUE_API_KEY,
  },
  timeout: 7000,
});

router.post("/newsletter", (req, res) => {
  // set up sendinblue functionalities later
  let auth = crypto.randomBytes(15).toString("hex");

  sendinblue
    .post("/contacts", {
      email: req.body.email,
      attributes: {
        token: auth,
      },
      listIds: [5],
      updateEnabled: false,
    })
    .then((response) => {
      res.sendStatus(201);
      console.log("contact created");
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
        res.sendStatus(500);
      } else if (error.request) {
        console.log(error.request.status);
        console.log(error.request.data);
        res.sendStatus(504);
      }
      console.log("Error: something went wrong");
    });
});

router.get("/newsletter/:token", (req, res) => {
  Newsletter.findOne({ emailToken: req.params.token }, (err, data) => {
    if (err || !data) {
      console.log(err);
      return res
        .status(410)
        .send(
          "<div style='text-align:center;'><h1>Error: The token you used doesn't exist or has expired</h1><div>"
        );
    }
    res.send(
      "<div style='text-align:center;'><h1>Welcome to our Newsletter</h1><p>An email of your free ebook will be sent to you shortly</p><div>"
    );
    // res.download("./sendinblue.txt");
    // Newsletter.deleteOne({ email: req.params.token });
  });
});

router.get("/", (req, res) => {
  res.render("pages/home");
});

router.get("/privacy-policy", (req, res) => {
  res.render("pages/privacy-policy");
});

router.get("/affiliate-disclosure", (req, res) => {
  res.render("pages/affiliate-disclosure");
});

router.get("/contact", (req, res) => {
  res.render("pages/contact");
});

router.get("/list-review/:url", (req, res) => {
  let otherPost = [];
  let pagePost;
  Post.find({}, (err, allPost) => {
    if (err || !allPost) {
      console.log(err || "posts were not found");
      return res.status(404).render("pages/not-found");
    }
    allPost.forEach((e) => {
      if (e.category === "list-review" && e.url === req.params.url) {
        pagePost = e;
      } else {
        otherPost.push(e);
      }
    });
    if (!pagePost) {
      return res.status(404).render("pages/not-found");
    }
    res.locals.recent = otherPost.reverse();
    res.render("pages/list-review", { post: pagePost });
  });
});

module.exports = router;
