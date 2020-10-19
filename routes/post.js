const express = require("express");
const app = express();
const router = express.Router();
const { Post } = require("../models");

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
