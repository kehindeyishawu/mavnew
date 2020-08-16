// Requiring Packages
const express = require("express"),
        app = express();


app.use(express.static(__dirname + "/public"))
app.set("view engine", "ejs")
        
// configuring packages


// requiring routes
const routes = require("./routes.js");


// Using routes
app.use(routes)

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server has started running")
})