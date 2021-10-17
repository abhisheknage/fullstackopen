const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((maxBlog, blog) => {
    return maxBlog.likes > blog.likes ? maxBlog : blog;
  }, []);
};

const mostBlogs = (blogs) => {
  const uniqueAuthors = [...new Set(blogs.map((blog) => blog.author))];

  const authorArray = uniqueAuthors.map((author) => {
    return { author: author, blogs: 0 };
  });
  blogs.forEach((blog) => {
    const indexAuthor = authorArray.findIndex((author) => {
      return author.author == blog.author;
    });
    authorArray[indexAuthor].blogs += 1;
  });
  const returnValue = authorArray.reduce(
    (acc, item) => (item.blogs > acc.blogs ? item : acc),
    { author: "no name", blogs: 0 }
  );
  //   console.log(returnValue);
  return returnValue;
};

const mostLikes = (blogs) => {
  const uniqueAuthors = [...new Set(blogs.map((blog) => blog.author))];
  const authorArray = uniqueAuthors.map((author) => {
    return { author: author, likes: 0 };
  });
  blogs.forEach((blog) => {
    const indexAuthor = authorArray.findIndex((author) => {
      return author.author == blog.author;
    });
    authorArray[indexAuthor].likes += blog.likes;
  });
  const returnValue = authorArray.reduce(
    (acc, item) => (item.likes > acc.likes ? item : acc),
    { author: "no name", likes: 0 }
  );
  return returnValue;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
