import mongoose from "mongoose";

const connectMongoDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("MongoDB connected successfully.");
  }
};

export default connectMongoDB;
