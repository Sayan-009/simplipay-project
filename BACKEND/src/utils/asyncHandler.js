const asyncHandler = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: false,
        message: error.message,
      });
    }
  };
};

export default asyncHandler;
