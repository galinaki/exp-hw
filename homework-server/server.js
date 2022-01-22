import express from "express";
import logger from "morgan"
import posts from "./posts/posts.js"

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.json(posts);
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const postDetail = posts.find((post) => post.id === id);
  res.json(postDetail);
});

app.post("/", (req, res) => {
  const newPost = req.body;
  posts.push(newPost);
  res.json(posts);
});

app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const postIndex = posts.findIndex(post => post.id === id);
  const updatedPost = {
    ...posts[postIndex],
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  posts.splice(postIndex, 1, updatedPost);
  res.json(updatedPost);
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  const postIndex = posts.findIndex(post => post.id === id);
  const deletePost = posts.find(deletedPost => deletedPost.id === id);
  console.log(deletePost);
  posts.splice(postIndex, 1);
  res.json(posts);
});

app.listen(PORT, ()=>console.log(`Listening on PORT ${PORT}`))
