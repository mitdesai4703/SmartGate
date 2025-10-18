import jwt from 'jsonwebtoken';

const authAdmin = (req, res, next) => {
 
  const token = req.headers['authorization']?.split(' ')[1] || req.cookies?.adminToken;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not Authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email === process.env.ADMIN_EMAIL) {
      req.admin = decoded;
      next();
    } else {
      return res.status(401).json({ success: false, message: 'Not Authorized' });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token expired or invalid' });
  }
};

export default authAdmin;
