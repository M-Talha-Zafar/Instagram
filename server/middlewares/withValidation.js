const withValidations = (validatorMiddleware) => async (req, res, next) => {
  try {
    await validatorMiddleware(req, res, next);
  } catch (ex) {
    console.log(ex);
    next({ status: 400, message: ex.message });
  }
};

module.exports = withValidations;
