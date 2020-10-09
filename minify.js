const fs = require("fs");
const Terser = require("terser");

const files = [
  { org: "./javascript/home.min.js", location: "./public/js/home.min.js" },
];
let min;
let result;

let minifyAssets = async () => {
  try {
    for (const e of files) {
      min = await fs.readFileSync(e.org).toString();
      result = await Terser.minify(min);
      fs.writeFileSync(e.location, result.code);
      //   console.log(result.code);
    }
  } catch (error) {
    console.log(error, "from terser minify catch block");
  }
};

module.exports = minifyAssets;
