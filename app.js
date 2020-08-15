// Requiring Packages
const express = require("express"),
        app = express();


app.use(express.static(__dirname + "/public"))
app.set("view engine", "ejs")
        
// configuring packages


// requiring routes
const route = require("./route.js");


// Using routes
app.use(route)

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server has started running")
})