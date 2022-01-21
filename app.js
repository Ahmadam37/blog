//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');
const { strictEqual } = require("assert");

const homeStartingContent = "This is a small project for blogs, you can blog anything you want and dynamically, i used this with ejs, if you want to create new blog you have to click compose. This is a small project for blogs, you can blog anything you want and dynamically, i used this with ejs, if you want to create new blog you have to click compose. This is a small project for blogs, you can blog anything you want and dynamically, i used this with ejs, if you want to create new blog you have to click compose.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});
// mongoose.connect("mongodb+srv://Ahmad-blog:<password>@cluster0.mpxrs.mongodb.net/blogDB")

const postSchema = ({
  title: String,
  content: String
})



const Post = mongoose.model("Post", postSchema);

app.get('/' , function(req , res){


  Post.find({}, function(err, findPosts){
    res.render("home", {
      startingPoint: homeStartingContent,
      postsArray: findPosts
      });
  });
  // Post.find({} , function(err , findPosts){
  //     res.render('home' , {
  //       startingPoint: homeStartingContent,
  //       postsArray: findPosts
  //     });
  // })
  
});
  // res.render('home', {
  //   startingPoint: aboutContent,
  //    postsArray: posts
  
  // });

app.get('/about' , function(req , res){

  res.render('about' , {
    aboutCon: aboutContent
  })

});

app.get("/contact" , function(req , res ){


  res.render("contact", {contactPage:contactContent})
});


app.get('/compose' , function(req , res ){
  res.render('compose')
});

app.post('/compose' , function (req , res){
  // const post = new Post({
  //   title: req.body.textTitle,
  //   content: req.body.textContent
  // });
  // post.save()

 const post = new Post({
  title:  req.body.textTitle,
  content: req.body.textContent
 });
 post.save(function(err){
  if (!err){
      res.redirect("/");
  }
});
});


app.get('/posts/:postId', function(req , res){

  const requestedPostId = req.params.postId;

  // for(var i =0 ; i<posts.length ; i++){

  //   const storedName = posts[i].title
  //   const storedContent = posts[i].content

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });


//    Post.findOne({_id:requestedPostId}, function(err , post){

//     if(!err){
//       res.render('post' , {
//         title: post.title,
//         content: post.content
//       })
//     }
//  })
    //  res.render('post' , {
    //    title: storedName ,
    //    content: storedContent
    // }
    
  // }

  // posts.forEach(function(log){
  //   const newPost = log.title;
 
  //   if (newPost === paramsName) {
  //     console.log("MATCH")
  //   }
  // });


});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
