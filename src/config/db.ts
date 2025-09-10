import mongoose from "mongoose";

export const connectToDb = async () => {
  
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/minibiz");
    console.log("MongoDB connected");
  
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); 
  }
};