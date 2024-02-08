import users from './data/users.js';
import colors from 'colors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import User from './models/userModel.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    console.log(createdUsers);
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

importData();
