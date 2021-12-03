const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const app = express();
const postAr = [];

const homeStrtContent = "In this blog you can write anything you want.";
const aboutContent = "You want to know about the creator? You are in. ";
const contactContent = "You want to contact me? Serve yourself. ";

app.use(bodyParser.urlencoded({
  extended: true
}))
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home", {
    homeCnt: homeStrtContent,
    postArHome: postAr //the first one is the name you give inside the <%= in home.ejs %>
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutCnt: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactCnt: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose")
});

app.post("/", function(req, res) {
  const composeAll = {
    newTitle: req.body.postTitle,
    newPost: req.body.postBody
  };
  // console.log(composeAll);
  postAr.push(composeAll);
  res.redirect("/");
});

app.get("/posts/:anything", function(req, res) {
  const requestedTitle = lodash.lowerCase(req.params.anything);
  // console.log(requestedTitle);
  // console.log(req.params.else);
  postAr.forEach(function(title) {
    const storedTitle = lodash.lowerCase(title.newTitle);
    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: title.newTitle,
        content: title.newPost
      });
      // console.log("match");
    }

  });

});

app.listen(process.env.PORT || 3000, function(req, res) {
  console.log("Server started at port 3000. ")
});
