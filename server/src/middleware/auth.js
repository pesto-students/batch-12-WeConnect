import jwt from 'jsonwebtoken';
import User from '../models/user';
import constants from '../constants/token';

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const data = jwt.verify(token, constants.JWT_KEY);
    // eslint-disable-next-line
    const user = await User.findOne({ _id: data._id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' });
  }
};

export default auth;
