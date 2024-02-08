import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`.bgGreen);
  } catch (err) {
    console.error(`Error: ${err.message}`.bgRed);
    process.exit(1);
  }
};

export default connectDB;
