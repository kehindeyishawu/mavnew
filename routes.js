const express = require("express"),
        router = express.Router(),
        {Post} = require("./models");


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

router.get("/list-review/:url", (req, res)=>{
    Post.findOne({url: req.params.url}, (err, post) => {
        if(err || !post){
            console.log(err, post)
            return res.redirect("/page-not-found")
        }
        res.render("list-review", {post: post})
    })
})

router.get("/page-not-found", (req, res) => {
    res.send("page could not be found")
})

module.exports = router;