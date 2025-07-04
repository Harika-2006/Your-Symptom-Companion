const mongoose = require("mongoose");

const mongoDb = async () => {
  try {
    const mongoURI = "mongodb+srv://harikaposina:12345@cluster0.v7lz6zk.mongodb.net/MERN-Project-1?retryWrites=true&w=majority&appName=Cluster0";
    // console.log("Connection String", mongoURI);
    
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    
    const mongodb = await mongoose.connect(mongoURI);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = mongoDb;
