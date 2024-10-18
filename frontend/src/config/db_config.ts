import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Replace with your actual MongoDB connection string
    const mongoURI =
      import.meta.env.MONGODB_URI || "mongodb://localhost:27017/your-database-name";

    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Consider exiting the process if the connection fails
    // process.exit(1);
  }
};

export default connectDB;