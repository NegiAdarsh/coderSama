//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');




const homeStartingContent = "Welcome to Blog section of Coder Sama, Feel free to share your thoughts and experience with plently of the users. Share how we Worked for you and how you felt. Tell us about Your experience and be the hero among millions. Please be polite with the words";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
let posts = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

let link="mongodb+srv://admin-adarsh:Test1234@cluster0.cul5flc.mongodb.net/blogDB";
mongoose.connect(link, {useNewUrlParser: true});




const postSchema = {
  title: String,
  content: String
 };

const Post = mongoose.model("Post", postSchema);

app.get("/",function(req,res)
{

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  })
});

app.get("/about",function(req,res){
  res.render("about",{aboutContent : aboutContent});
})

app.get("/contact",function(req,res){
  res.render("contact",{contactContent : contactContent});
})

app.get("/compose",function(req,res){
  res.render("compose");
})




app.post("/compose",function(req,res){

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
})




app.get("/posts/:postName",function(req,res){
  const requestedPostId = req.params.postName;
  // console.log(requestedPostId);
  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      postTitle: post.title,
      postBody: post.content
    });
  });
});

let port= process.env.PORT;
if(port== null || port == ""){
    port=3000;
}


app.listen(port, function() {
  console.log("Server started on port 3000");
});
