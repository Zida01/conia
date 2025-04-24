


module.exports = (schema) => (req, res, next) => {
    // const { error } = schema.validate(req.body);
    // if (error) return res.status(400).json({ message: error.details[0].message });
    //next();

    const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const allErrors = error.details.map(err => err.message);
    return res.status(400).json({ errors: allErrors });
  }

  next();
  };