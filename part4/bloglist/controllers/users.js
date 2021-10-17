const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

usersRouter.get("/", async (req, res) => {
  //   console.log("received request");
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });

  res.json(users);
});
usersRouter.post("/", async (req, res) => {
  const body = req.body;

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(body.password, salt);
  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });
  const result = await newUser.save();
  //   console.log(JSON.stringify(result));
  res.json(result);
});

module.exports = usersRouter;
