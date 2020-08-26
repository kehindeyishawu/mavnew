const express = require("express"),
        router = express.Router();


router.get("/", (req, res)=>{
    res.render("home")
})

router.get("/privacy-policy", (req, res)=>{
    res.render("privacy-policy")
})

router.get("/affiliate-disclosure", (req, res)=>{
    res.render("affiliate-disclosure")
})

// router.get("/:category/:url", (req, res){
//     Post.find({url:req.params.url})
//     res.render(req.params.category)
// })

router.get("/list-review/:name", (req, res)=>{
    res.render("list-review", {url: "best-exercise-bike"})
})

module.exports = router;