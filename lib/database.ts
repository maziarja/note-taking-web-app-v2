import mongoose from "mongoose";

let connected = false;

const connectDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);
  //   if db connected do not connected again
  if (connected) {
    console.log("Database is already connected");
    return;
  }
  // connect to db
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("DATABASE_URI is not defined in environment variables");
  }

  try {
    await mongoose.connect(uri, { dbName: "note-taking-web-app-v2" });
    connected = true;
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err;
  }
};

export default connectDB;
