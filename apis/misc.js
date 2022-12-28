import { Router } from "express";
import fs from "fs";
const miscRoutes = Router();

let data = ["sagar", "anshu", "kaustubh", "arun", "abhishekh"];

miscRoutes.get("/", (req, res) => {
  let responseObj = {
    message: "hii",
  };

  res.json(responseObj);
});

miscRoutes.get("/get-user-information", (req, res) => {
  let responseObj = {
    username: "sagar",
    avatarImageUrl: "asdkf",
  };

  res.json(responseObj);
});

miscRoutes.get("/get-article", (req, res) => {
  let responseObj = {
    message: "hii, this is an article",
  };

  res.json(responseObj);
});

miscRoutes.get("/square-of-number", (req, res) => {
  let number = req.query.number;

  let responseObj = {
    number: number,
    square: number * number,
  };

  res.json(responseObj);
});

miscRoutes.get("/check-even-or-odd", (req, res) => {
  let number = req.query.number;
  let result = "";
  if (number % 2 == 0) {
    result = "even";
  } else {
    result = "odd";
  }
  let responseObj = {
    number: number,
    result: result,
  };

  res.json(responseObj);
});

//create post-------------*****************************---------------------

miscRoutes.get("/check-even-odd", (req, res) => {
  let number = req.query.number;

  let responseObj = {
    number: number,
    result: number % 2 == 0 ? "even" : "odd",
  };

  res.json(responseObj);
});

miscRoutes.get("/get-users-with-start-letter--s", (req, res) => {
  let result = data.filter((item) => item.charAt(0) == "s");

  let responseObj = {
    users: data,
    result: result,
  };

  res.json(responseObj);
});

miscRoutes.get("/get-users-with-start-letter", (req, res) => {
  let char = req.query.char;
  let result = data.filter((item) => item.startsWith(char));

  let responseObj = {
    users: data,
    result: result,
  };

  res.json(responseObj);
});
export default miscRoutes;
