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
  // date: { type: Date, default: Date.now },
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
  expireAt: { type: Date, default: Date.now, expires: "48h" },
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
// collection.Post.create({
//     name: "Best Recumbent Bike 2020",
//     postImg: "exercise-bike-rim-and-pedal.jpg",
//     postImgAlt: "exercise bike rim and pedal",
//     metaDesc: "With so many varieties in the market today, it can be difficult selecting the right one for you. Which is why we at MAVNEW have compiled a list of the Best Recumbent Bike in the market today. Recumbent bikes are best known for the comfort they give to users while cycling (especially for people with back problems).They put less tension on the joints and provide a good rehabilitation exercise to help elderly people integrate the sit-and-stand movement",
//     url: "best-recumbent-bike",
//     category: "list-review",
//     share: {
//         fb: "facebook.com"
//     }
// }, (err, post)=>{
//     if(err){
//         console.log('error: something went wrong with the post creation request in models file')
//     }else{console.log("post sucessfully created")}
// })

module.exports = collection;
