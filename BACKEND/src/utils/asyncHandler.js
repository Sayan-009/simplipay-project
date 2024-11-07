const asyncHandler = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      res.status(500 || error.code).json({
        status: false,
        message: error.message,
      });
    }
  };
};

export default asyncHandler;
