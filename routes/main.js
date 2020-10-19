const express = require("express"),
  router = express.Router(),
  axios = require("axios").default,
  crypto = require("crypto"),
  { Post, Newsletter } = require("../models");

require("dotenv").config(); // env variables
const sendinblue = axios.create({
  baseURL: "https://api.sendinblue.com/v3",
  headers: {
    "api-key": process.env.SENDINBLUE_API_KEY,
  },
  timeout: 7000,
});

router.get("/", (req, res) => {
  Post.find({}, (err, data) => {
    if (err) {
      console.log(err);
      return res
        .status(502)
        .send(
          "<h2 style='margin-top:30px;'>Sorry we are currently experiencing some technical difficulties here. The page will be back up as soon as possible</h2>"
        );
    }
    res.render("pages/home", { post: data });
  });
});

router.get("/robots.txt", (req, res) => {
  res.sendFile("robots.txt");
});

router.get("/sitemap.xml", (req, res) => {
  res.type("application/xml");
  res.sendFile("sitemap.xml");
});

router.post("/newsletter", (req, res) => {
  // set up sendinblue functionalities later
  let auth = crypto.randomBytes(15).toString("hex");
  const sanEmail = req.sanitize(req.body.email);

  sendinblue
    .post("/contacts", {
      email: sanEmail,
      attributes: {
        token: auth,
      },
      listIds: [5],
      updateEnabled: false,
    })
    .then((response) => {
      res.sendStatus(201);
      console.log("contact created");
      Newsletter.create({ email: sanEmail, emailToken: auth });
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
        res.sendStatus(502);
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
    Newsletter.deleteOne({ emailToken: req.params.token });
    // res.download("./sendinblue.txt");
    // Newsletter.deleteOne({ email: req.params.token });
  });
});

router.get("/privacy-policy", (req, res) => {
  res.render("pages/privacy-policy");
});

router.get("/affiliate-disclosure", (req, res) => {
  res.render("pages/affiliate-disclosure");
});

router.get("/contact", (req, res) => {
  Post.find({}, (err, allPost) => {
    if (err || !allPost) {
      console.log(err || "posts were not found");
      return res
        .status(502)
        .render(
          "<h2 style='margin-top:30px;'>Sorry we are currently experiencing some technical difficulties here. The page will be back up as soon as possible</h2>"
        );
    }
    res.locals.recent = allPost.reverse();
    res.render("pages/contact");
  });
});

router.post("/contact", (req, res) => {
  const contactEmail = req.sanitize(req.body.contactEmail);
  const contactName = req.sanitize(req.body.contactName);
  const contactMessage = req.sanitize(req.body.contactMessage);
  const contactSubject = req.sanitize(req.body.contactSubject);

  sendinblue
    .post("/smtp/email", {
      sender: {
        name: "Mavnew Contact Form",
        email: "no-reply@mavnew.com",
      },
      to: [{ email: "rosaryfirm@gmail.com" }],
      htmlContent: `<h3>Sender name and email: ${contactName} & ${contactEmail}</h3><p>${contactMessage}</p>`,
      textContent: `Sender name and email: ${contactName} & ${contactEmail}.        ${contactMessage}`,
      subject: contactSubject || "No subject",
      replyTo: { email: contactEmail, name: contactName },
    })
    .then(() => {
      req.flash(
        "success",
        "Your message has been sent, we will get back to you shortly."
      );
      res.redirect("/contact");
    })
    .catch((error) => {
      req.flash(
        "error",
        "Error: Your message failed to send!! Please try again later."
      );
      res.redirect("/contact");
      console.log(error);
    });
});

module.exports = router;
