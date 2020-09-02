const mongoose = require("mongoose");

// schemas
const postSchema = new mongoose.Schema({
    name: String,
    postImg: String,
    postImgAlt: String,
    metaDesc: String,
    // content: String,
    // author
    url: String,
    // date: { type: Date, default: Date.now },
    category: String
})


// collection object
const collection = {
    Post: mongoose.model("Post", postSchema)
}

module.exports = collection