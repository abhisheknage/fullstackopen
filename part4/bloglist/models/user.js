const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const config = require("../utils/config");

mongoose.connect(config.MONGODB_URI);
console.log("mongouri is ", config.MONGODB_URI);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3, unique: true },
  name: String,
  passwordHash: { type: String, required: true, minlength: 3 },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});
userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.passwordHash;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
