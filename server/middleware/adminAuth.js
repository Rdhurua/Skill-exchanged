import  jwt  from 'jsonwebtoken';
import Admin  from '../model/admin-model.js';

const adminAuthMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded._id);

    if (!admin) {
      return res.status(403).json({ message: 'Forbidden: Admin access only' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token', error });
  }
};

 export default adminAuthMiddleware;
