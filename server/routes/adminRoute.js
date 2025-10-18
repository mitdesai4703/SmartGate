
import express from 'express';
import { isAdminAuth, adminLogin, adminLogout } from '../controllers/adminController.js';
import authAdmin from '../middleware/authAdmin.js';
import User from '../models/User.js';

const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);
adminRouter.get('/is-auth', authAdmin, isAdminAuth);
adminRouter.get('/logout', adminLogout);


adminRouter.get('/all-users', async (req, res) => {
  try {
    const users = await User.find().select('name email'); 
    res.json({ success: true, users });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

export default adminRouter;
