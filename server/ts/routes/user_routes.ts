


import express from 'express';
import { deleteMyProfile, deleteUsers } from '../controllers/user_controllers';
import { ensureAuth, ensureGuest } from '../middleware/auth';

const router = express.Router();

router.route('/delete-my-profile').delete(ensureAuth, deleteMyProfile);

router.route('/delete-users').delete(deleteUsers);

export default router;
