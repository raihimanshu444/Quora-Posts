const express=require("express");
const app=express();
const port =8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");


app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.set("views enjine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"Himanshu",
        content:"I love coding"
    },
    {
        id:uuidv4(),
        username:"Anyone",
        content:"Hard work is important."
    },
    {
        id:uuidv4(),
        username:"Gandhi",
        content:"I love India."
    }
];

app.get("/posts",(req,res) =>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res) => {
    res.render("new.ejs")
})

app.post("/posts",(req,res) => {
    let {username,content} =req.body;
    let id=uuidv4();   //creating id for new post
    posts.push({id,username,content});
    res.redirect("/posts"); //by default send get req to posts
});

app.get("/posts/:id",(req,res) => {
    let {id}=req.params;
    let post=posts.find((p) => id=== p.id);  //find array method
    res.render("show.ejs",{post});
    res.send("request working.");
});

app.patch("/posts/:id",(req,res) => {
    let {id}=req.params;
    let newContent=req.body.content;
    console.log(newContent);
    //console.log(id);
    let post=posts.find((p) => id=== p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res) => {
    let {id}=req.params;
    let post=posts.find((p) => id=== p.id);  //finding post based on id
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res) => {
    let {id}=req.params;
    posts=posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.listen(port,() => {
    console.log("Listening to port: 8080");
});