//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');


var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb+srv://amankumartiwari1502:Harsh9575381459@cluster0.2ur35sv.mongodb.net/PostDB';
mongoose.connect(mongoDB);




var Schema = mongoose.Schema;

var postSchema = new Schema({

    title: String,
    content: String,
    day: String
});
// Compile model from schema
var PostModel = mongoose.model('post', postSchema );


// creating global array to store objects from post

let posts = [];


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));





app.get("/", function (req, res) {

  

  PostModel.find(function (err, resultArray) {  
    if(err){
      console.log(err);
    }else{
      res.render("home", { content: homeStartingContent , postArray: resultArray});
    }
  })

  // app.render("home", {key:herepassing});
  // res.render("home", { content: homeStartingContent , postArray: posts});


})

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
})

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
})



app.get("/admin", function (req, res) { 
  res.render("admin");
 })

app.post("/admin", function (req, res) { 

  let id = "Harshit@gmail.com"
  let pass = "1502"

  let email = req.body.email;
  let password = req.body.password;

  

  if(email == id && password == pass){
      res.render("compose");
  }else{
    res.render("fail");
  }

  
 })


app.get("/post/:postId", function (req, res) {

  var id = req.params.postId;


  PostModel.findById(id, function (err, docs) { 
    if(err){
      console.log(err);
    }else{
      
       let title = docs.title;
       let desc = docs.content;
        res.render("post", {header: docs.title , para: docs.content} );
    }
   
   
   })




  
  // res.render("post");
})




app.post("/compose", function (req, res) {

  let today = new Date();

  

  let options = {
      weekday: "long",
      day: "numeric",
      month: "long"
  };

  let dayz = today.toLocaleDateString("en-US", options);

  let id = _.lowerCase(req.body.posting);

  // let postObj = {
  //   ids: id,
  //   title: req.body.posting,
  //   body : req.body.bodyContent,
  //   date : day
    
  // }


  const posting = new PostModel({
    title: req.body.posting,
    content:req.body.bodyContent,
    day: dayz
  });

  posting.save().then(()=>console.log("pushed"));





  // posts.push(postObj);

  res.redirect("/");
  
})


app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");

});
