const express = require("express"),
  router = express.Router(),
  axios = require("axios").default,
  { Post, Newsletter } = require("./models");

require("dotenv").config(); // env variables
const sendinblue = axios.create({
  baseURL: "https://api.sendinblue.com/v3",
  headers: {
    "api-key": process.env.SENDINBLUE_API_KEY,
  },
  timeout: 10000,
});

sendinblue
  .post("/contacts", {
    email: "kevinyishawu@gmail.com",
    attributes: {
      firstname: "Kehinde",
      lastname: "Yishawu",
      sms: "+2348067362005",
    },
    listIds: [5],
    updateEnabled: false,
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err.status, err.data);
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

router.post("/api/newsletter", (req, res) => {
  // set up sendinblue functionalities later
  console.log(req.body);
  res.sendStatus(201);
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
