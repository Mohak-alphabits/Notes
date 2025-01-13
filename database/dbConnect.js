const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/crud";
const connectMongoose = async () => { 
  try {
    await mongoose.connect(url,);
    console.log("db connected")
} catch (err) { 
  console.error("error connecting", err);
}
};


module.exports = connectMongoose;
