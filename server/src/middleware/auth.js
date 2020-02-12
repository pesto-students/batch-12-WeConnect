import jwt from 'jsonwebtoken';
import User from '../models/user';
import constants from '../constants/token';

const auth = async (req, res, next) => {
  const token = req.cookies.token || '';
  try {
    if (!token) {
      res.status(401).send({ error: 'Not authorized to access this resource' });
    } else {
      const data = await jwt.verify(token, constants.JWT_KEY);
      const user = await User.findOne({ _id: data._id });
      if (!user) {
        throw new Error();
      }
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' });
  }
};

export default auth;
