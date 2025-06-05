const validation = (schemas, URL) => {
  return async (req, res, next) => {
    const validationResult = [];
    for (const [reqKey, schema] of Object.entries(schemas)) {
      //   console.log([reqKey, schema]);
      //   console.log(schema.validate(req[reqKey], { abortEarly: false }));
      const { error } = schema.validate(req[reqKey], { abortEarly: false });
      if (error)
        // validationResult.push({
        //   type: reqKey,
        //   error: error.details.map((err) => err.message),
        // });
        for (const detail of error.details) {
          //   console.log(detail);
          validationResult.push(detail.path[0]);
        }
    }
    // console.log(validationResult);

    if (validationResult.length) {
      req.flash("validationErr", validationResult);
      req.flash("oldData", { ...req.body, ...req.params, ...req.query });
      return res.redirect(URL);
    }
    return next();
  };
};
export default validation;
