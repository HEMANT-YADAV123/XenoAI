class errorResponse extends Error{

    constructor(message,statusCode)
    {
        super(message);//it calls the constructer of parent classi.e Error class as errorResponse extends Error class.And we get message from that constructer.
        this.statusCode = statusCode;
    }
}

module.exports = errorResponse