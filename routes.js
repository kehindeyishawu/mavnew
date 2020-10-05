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
  // configure a mongoose random string schema
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
