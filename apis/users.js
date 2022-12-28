import { Router } from "express";
import fs from "fs";
import { json } from "express";

const userRoutes = Router();

userRoutes.get("/authenticate", (req, res) => {
  let users = JSON.parse(fs.readFileSync("./data/users.json"));
  const isAuthenticated = users.some(
    (x) => x.username == req.query.username && x.password == req.query.password
  );

  let responseObj = {
    result: isAuthenticated,
  };

  res.json(responseObj);
});

userRoutes.post("/add-new-user", (req, res) => {
  //Create new user in array

  let users = JSON.parse(fs.readFileSync("./data/users.json"));

  const isPresent = users.some((x) => x.username == req.body.username);

  console.log(users);

  if (isPresent == true) {
    return res.json({
      result: false,
    });
  } else {
    let obj = req.body;

    users.push(obj);
    fs.writeFileSync("./data/users.json", JSON.stringify(users));
    return res.json({
      result: true,
    });
  }
});

export default userRoutes;
