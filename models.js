const mongoose = require("mongoose");
const crypto = require("crypto");

// schemas
const postSchema = new mongoose.Schema({
  name: String,
  postImg: String,
  postImgAlt: String,
  metaDesc: String,
  // content: String,
  // author
  url: String,
  date: { type: Date, default: Date.now },
  share: {
    fb: String,
    tw: String,
    p: String,
    ln: String,
    ws: String,
  },
  category: String,
});

const newsletter = new mongoose.Schema({
  email: String,
  emailToken: { type: String, default: crypto.randomBytes(64).toString("hex") },
  expireAt: { type: Date, default: Date.now, expires: "2880m" },
});

// collection object
const collection = {
  Post: mongoose.model("Post", postSchema),
  Newsletter: mongoose.model("Newsletter", newsletter),
};

// collection.Newsletter.create(
//   { email: "should expire in 2days" },
//   (err, data) => {
//     if (err) {
//       return console.log(err);
//     }
//     console.log(data);
//   }
// );

collection.Post.create({
    name: "Best Recumbent Bike 2022",
    postImg: "recumbent-bike",
    postImgAlt: "Recumbent bike rim and paddle",
    metaDesc: "Need a Recumbent Bike in 2022? We have got you covered. Brush through our list of top recumbent bikes for yor needs",
    url: "best-recumbent-bike",
    date: new Date(2022, 6, 24),
    category: "list-review",
    share: {
        fb: "facebook.com"
    }
}, (err, post)=>{
    if(err){
        console.log('error: something went wrong with the post creation request in models file')
    }else{console.log("post sucessfully created")}
})

module.exports = collection;
