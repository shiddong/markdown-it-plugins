const fs = require("fs");
const path = require("path");
const md2Html = require("./md2html");

const md = fs.readFileSync(path.join(__dirname, "./test.md"), "UTF-8");
const html = md2Html.parse(md);

console.log(html);
