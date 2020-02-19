const isCustomer = async (req, res, next) => {
  try {
    if (req.user.role === 1) {
      next();
    } else {
      throw new Error(
        'Not a cutomer, Only customers authorized to access this resource',
      );
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
};

export default isCustomer;
