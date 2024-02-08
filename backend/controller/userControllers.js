import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

/**
 * @desc		Create New User
 * @route		POST /api/users/
 * @access	public
 */

const createUser = asyncHandler(async (req, res) => {
  const { name, email, age } = req.body;
  const user = new User({ name, email, age });
  await user.save();

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
    });
  } else {
    res.status(401);
    throw new Error('Invalid user data');
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { name, email, age } = req.body;
  const user = await User.findById(req.params.id);

  if (user) {
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email);
    user.age = req.body.age || user.age;

    const updatedUser = await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { createUser, updateUser };
