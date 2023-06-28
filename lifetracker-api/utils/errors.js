
class ExpressErrors extends Errors{
    constructor(message, status) {
        super()

        this.message = message;
        this.status = status;
    }
}

/**404 Not Found Error */
class NotFoundError extends ExpressErrors {
    constructor(message="Not Found"){ 
        super(message, 404);
    }
}

/**400 Bad Request Error */
class BadRequestError extends ExpressErrors {
    constructor(message="Bad Request"){
        super(message, 400)
    }
}

/**403 Error */
class ForbiddenError extends ExpressErrors {
    constructor(message="Forbidden"){
        super(message, 403)
    }
}

/**401 Unauthorized Error */
class UnauthorizedError extends ExpressErrors {
    constructor(message="Unathorized"){
        super(message, 401)
    }
}

/** 422 Unprocessable Entity error */
class UnprocessableEntityError extends ExpressError {
    constructor(message = "Unprocessable Entity") {
      super(message, 422)
    }
  }

module.exports = {
    ExpressError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    UnprocessableEntityError,
  }