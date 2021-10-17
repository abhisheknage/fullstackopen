const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const userExtractor = require("../utils/middleware").userExtractor;

blogsRouter.get("/", async (request, response) => {
  //   console.log("in router, getting info");
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const requestingUser = request.user;
  console.log("token is ", request.token);
  console.log("requesting user is ", request.user);
  // const token = getTokenFrom(request);
  // const decodedToken = jwt.verify(request.token, process.env.SECRET);
  // console.log("decoded token is ", decodedToken);
  if (!requestingUser || !requestingUser.id) {
    console.log("There is an error");
    return response.status(401).json({ error: "token missing or invalid" });
  }
  if (!body.title || !body.url) {
    return response
      .status(400)
      .json({ error: "Request does not have title or url" });
  }
  const user = await User.findById(requestingUser.id.toString());
  // console.log("user is ", user);
  // adding and saving to blog
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });
  const result = await blog.save();

  // adding and saving to users
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  response.json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const blogToDelete = await Blog.findById(request.params.id);
  console.log("executing till this point");
  // check if user asking to delete blog is the creator of the blog
  // console.log(decodedToken.id.toString());
  // console.log(blogToDelete.id.toString());
  if (
    blogToDelete !== null &&
    decodedToken.id.toString() === blogToDelete.user.toString()
  ) {
    const result = await Blog.deleteOne({ id: blogToDelete.id.toString() });
    response.json(result);
  } else {
    response
      .status(401)
      .send(
        "You cannot delete the post as you were not the one that created it, or the post may have already been deleted"
      );
  }
});
blogsRouter.put("/:id", async (request, response) => {
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    returnOriginal: false,
  });
  response.json(result);
});

module.exports = blogsRouter;
