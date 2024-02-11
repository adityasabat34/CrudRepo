import express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserData,
  updateUser,
} from '../controller/userControllers.js';

const router = express.Router();

router.route('/').post(createUser).get(getAllUsers);
router.route('/:id').put(updateUser).delete(deleteUser);
router.route('/data').get(getUserData);

export default router;
