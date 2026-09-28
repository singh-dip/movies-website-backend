const mongoose = require("mongoose")

const validateId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid movie ID format"
        })
    }
    next()
}

const validateMovieCreate = (req, res, next) => {
    const requiredFields = ["name", "description", "director", "casts", "language", "releaseDate", "releaseStatus"]
    const missingFields = []

    for (const field of requiredFields) {
        if (req.body[field] === undefined || req.body[field] === null || req.body[field] === "") {
            missingFields.push(field)
        }
    }

    if (Array.isArray(req.body.director) && req.body.director.length === 0) {
        missingFields.push("director")
    }
    if (Array.isArray(req.body.casts) && req.body.casts.length === 0) {
        missingFields.push("casts")
    }
    if (Array.isArray(req.body.language) && req.body.language.length === 0) {
        missingFields.push("language")
    }

    if (missingFields.length > 0) {
        return res.status(400).json({
            success: false,
            message: "All required fields must be provided",
            missingFields
        })
    }

    next()
}

const validateMovieUpdate = (req, res, next) => {
    const allowedFields = ["name", "description", "director", "casts", "language", "releaseDate", "releaseStatus"]
    const providedFields = Object.keys(req.body)

    for (const field of providedFields) {
        if (!allowedFields.includes(field)) {
            return res.status(400).json({
                success: false,
                message: `Field "${field}" is not allowed for update`
            })
        }
    }

    if (providedFields.length === 0) {
        return res.status(400).json({
            success: false,
            message: "At least one field is required for update"
        })
    }

    next()
}

const validateTheaterCreate = (req, res, next) => {
    const requiredFields = ["name", "city", "Address", "location", "Zipcode", "streetName"]
    const missingFields = []

    for (const field of requiredFields) {
        if (req.body[field] === undefined || req.body[field] === null || req.body[field] === "") {
            missingFields.push(field)
        }
    }

    if (missingFields.length > 0) {
        return res.status(400).json({
            success: false,
            message: "All required fields must be provided",
            missingFields
        })
    }

    next()
}

module.exports = {
    validateId,
    validateMovieCreate,
    validateMovieUpdate,
    validateTheaterCreate
}
