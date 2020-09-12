// Requiring Packages and model
const express = require("express"),
        app = express(),
        mongoose = require("mongoose");


app.use(express.static(__dirname + "/public"))
app.set("view engine", "ejs")
require("dotenv").config()

// configuring packages
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB connected!!!")
}).catch(err => console.log(err))

// requiring routes
const routes = require("./routes.js");


// Using routes
app.use(routes)

// 404 route
app.use((req, res, next)=>{
    res.status(404).render("pages/not-found")
})

// start server
app.listen(process.env.PORT || 3000, ()=>{
    console.log("server has started running")
})