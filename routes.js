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

router.get("/:category/:url", (req, res) => {
    let otherPost = []
    let pagePost;
    Post.find({}, (err, allPost) => {
        if(err || !allPost){
            console.log(err, allPost)
            return res.redirect("/page-not-found")
        }
        allPost.forEach(e => {
            if(e.category === req.params.category && e.url === req.params.url){
                pagePost = e
            }else{
                otherPost.push(e)
            }
        })
        res.locals.recent = otherPost.reverse()
        res.render(req.params.category, {post: pagePost})
    })
})

// router.get("/list-review/:url", (req, res)=>{
//     Post.findOne({url: req.params.url}, (err, post) => {
//         if(err || !post){
//             console.log(err, post)
//             return res.redirect("/page-not-found")
//         }
//         res.render("list-review", {post: post})
//     })
// })

router.get("/page-not-found", (req, res) => {
    res.send("page could not be found")
})

module.exports = router;