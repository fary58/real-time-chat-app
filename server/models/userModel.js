const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    profilePhoto:{
        type:String,
        required:true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
