const express = require("express"),
        router = express.Router();


router.get("/", (req, res)=>{
    res.render("home")
})

router.get("/privacy-policy", (req, res)=>{
    res.render("privacy-policy")
})


module.exports = router;