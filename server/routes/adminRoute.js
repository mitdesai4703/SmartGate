import express from 'express';
import { isAdminAuth, adminLogin, adminLogout } from '../controllers/adminController.js';
import authAdmin from '../middleware/authAdmin.js';

const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);
adminRouter.get('/is-auth', authAdmin, isAdminAuth);
adminRouter.get('/logout', adminLogout);

export default adminRouter;