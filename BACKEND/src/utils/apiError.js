class apiError extends Error{
    constructor(
        statusCode,
        message = "something went wrong",
        error = [],
        stack = ""
      ) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
    
        this.success = false;
        this.data = null;
    
        if (stack) {
          this.stack = stack;
        } else {
          Error.captureStackTrace(this, this.constructor);
        }
      }
}

export default apiError;