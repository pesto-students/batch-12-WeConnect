import camelcaseKeys from 'camelcase-keys';

const camelcase = (req, res, next) => {
  req.body = camelcaseKeys(req.body, { deep: true });
  req.params = camelcaseKeys(req.params);
  req.query = camelcaseKeys(req.query);
  next();
};

export default camelcase;
