const express = require("express"),
        router = express.Router(),
        {Post} = require("./models");


router.get("/", (req, res)=>{
    res.render("pages/home")
})

router.get("/privacy-policy", (req, res)=>{
    res.render("pages/privacy-policy")
})

router.get("/affiliate-disclosure", (req, res)=>{
    res.render("pages/affiliate-disclosure")
})

// router.get("/:category/:url", (req, res) => {
//     let otherPost = []
//     let pagePost;
//     Post.find({}, (err, allPost) => {
//         if(err || !allPost){
//             console.log(err, allPost)
//             return res.status(404).render("not-found")
//         }
//         allPost.forEach(e => {
//             if(e.category === req.params.category && e.url === req.params.url){
//                 pagePost = e
//             }else{
//                 otherPost.push(e)
//             }
//         })
//         if(!pagePost){
//            return res.status(404).render("not-found")
//         }
//         res.locals.recent = otherPost.reverse()
//         res.render(req.params.category, {post: pagePost})
//     })
// })

router.get("/list-review/:url", (req, res)=>{
    let otherPost = []
    let pagePost;
    Post.find({}, (err, allPost) => {
        if(err || !allPost){
            console.log(err || "posts were not found")
            return res.status(404).render("pages/not-found")
        }
        allPost.forEach(e => {
            if(e.category === "list-review" && e.url === req.params.url){
                pagePost = e
            }else{
                otherPost.push(e)
            }
        })
        if(!pagePost){
           return res.status(404).render("pages/not-found")
        }
        res.locals.recent = otherPost.reverse()
        res.render("pages/list-review", {post: pagePost})
    })
})


module.exports = router;