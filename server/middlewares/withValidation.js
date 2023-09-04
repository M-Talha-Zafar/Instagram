const withValidations = (middlewareFunc) => async (req, res, next) => {
  try {
    await middlewareFunc(req, res, next);
  } catch (ex) {
    console.log(ex);
    next({ status: 500, message: ex.message });
  }
};

module.exports = withValidations;
