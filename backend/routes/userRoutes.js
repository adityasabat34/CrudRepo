import express from 'express';
import { createUser, updateUser } from '../controller/userControllers.js';

const router = express.Router();

router.route('/create').post(createUser);
router.route('/update').put(updateUser);

export default router;
