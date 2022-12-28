import { Router } from "express";
import fs from "fs";
import { json } from "express";

const postRoutes = Router();

//get all

postRoutes.get("/posts", (req, res) => {
  let postList = JSON.parse(fs.readFileSync("./data/postList.json"));
  res.json(postList);
});

//get single
postRoutes.get("/posts/:id", (req, res) => {
  let id = req.params.id;

  let postList = JSON.parse(fs.readFileSync("./data/postList.json"));

  let post = postList.find((x) => x.id == id);

  res.json(post);
});

//create
postRoutes.post("/posts", (req, res) => {
  let postList = JSON.parse(fs.readFileSync("./data/postList.json"));

  let obj = req.body;

  obj["id"] = generateUUID();
  obj["likes"] = 0;
  obj["likedUsers"] = [];

  postList.push(obj);

  fs.writeFileSync("./data/postList.json", JSON.stringify(postList));

  return res.json({
    result: true,
  });
});

postRoutes.delete("/posts", (req, res) => {
  return res.json({
    result: true,
  });
});
postRoutes.put("/posts", (req, res) => {
  return res.json({
    result: true,
  });
});

//likes
postRoutes.patch("/posts/:id/like", (req, res) => {
  let id = req.params.id;
  let username = req.body.username;

  //get item from database
  let postList = JSON.parse(fs.readFileSync("./data/postList.json"));
  let index = postList.findIndex((x) => x.id == id);

  //checking if found

  if (index > -1) {
    let post = postList[index];

    if (!post.likedUsers.some((x) => x == username)) {
      //update likes
      postList[index].likedUsers.push(username);
      postList[index].likes = postList[index].likedUsers.length;

      //save the file
      fs.writeFileSync("./data/postList.json", JSON.stringify(postList));
      //done
      return res.json({
        result: true,
        newLikes: postList[index].likes,
      });
    }
  } else {
    return res.json({
      result: false,
    });
  }
});

//comment
postRoutes.post("/posts/:id/like", (req, res) => {
  let id = req.params.id;
  let commentObj = req.body.username;

  //get item from database
  let postList = JSON.parse(fs.readFileSync("./data/postList.json"));
  let index = postList.findIndex((x) => x.id == id);

  //checking if found

  if (index > -1) {
    let post = postList[index];
    post.comments.push(commentObj);

    //update likes
    postList[index].likedUsers.push(username);
    postList[index].likes = postList[index].likedUsers.length;

    //save the file
    fs.writeFileSync("./data/postList.json", JSON.stringify(postList));
    //done
    return res.json({
      result: true,
      newComments: post.comments,
    });
  }
  return res.json({
    result: false,
  });
});

function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export default postRoutes;
