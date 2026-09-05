const sendSuccessResponse = (res, statusCode, result, message) => {
    res.status(statusCode).json({
        success: true,
        result,
        message
    })
}

const sendErrorResponse = (res, statusCode, error) => {
    if (error instanceof Error) {
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
    } else {
        res.status(statusCode).json({
            success: false,
            err: error,
            data: ""
        })
    }
}

module.exports = {
    sendSuccessResponse,
    sendErrorResponse
}
