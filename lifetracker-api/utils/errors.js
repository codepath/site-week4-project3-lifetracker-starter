
class ExpressError extends Error{
    constructor(message,status){
        super()
        this.message=message
        this.status=status

    }
}

class BadRequestError extends ExpressError{
    constructor(message="Bad Request"){
        super(message, 400)
    }
}

class UnauthorizedError extends ExpressEror{
    constructor(message="unauthorized"){
        super(message,401)
    }
}

class ForbiddenError extends ExpressError{
    constructor(message="Forbidden"){
        super(message,403)
    }
}

class NotFoundEror extends ExpressError{
    constructor(message="Not Found"){
        super(message,404)
    }
} 
class UnprocessableEntityError extends ExpressError{
    constructor(message="unprocessable Entity"){
        super(message,422)
    }
}
module.exports={
    ExpressError,
    BadRequestError,
    NotFoundEror,
    ForbiddenError,
    UnprocessableEntityError,
    UnauthorizedError

}