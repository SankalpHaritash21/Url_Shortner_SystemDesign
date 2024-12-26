import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connections && mongoose.connections[0].readyState) return;
    const connect = await mongoose.connect(`${process.env.MONGODB_URL}`, {
      dbName: "URLShortner",
    });
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
