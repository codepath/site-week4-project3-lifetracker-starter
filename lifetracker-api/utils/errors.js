
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

/**502 Bad Gateway Error */
class BadGatewayError extends ExpressErrors {
    constructor(message="Bad Gateway"){
        super(message, 502)
    }
}

/**401 Unauthorized Error */
class UnauthorizedError extends ExpressErrors {
    constructor(message="Unathorized"){
        super(message, 401)
    }
}