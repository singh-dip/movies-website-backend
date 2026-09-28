const { z } = require("zod")
const mongoose = require("mongoose")

// CREATE validation - theaterId required
const screenCreateSchema = z.object({
    screenName: z.string().min(1, "screenName cannot be empty"),
    theaterId: z.string().min(1, "theaterId is required"),
    totalSeats: z.number().int().min(1, "totalSeats must be at least 1"),
    screenType: z.enum(["2D", "3D", "IMAX", "DOLBY"], {
        errorMap: () => ({ message: "screenType must be 2D, 3D, IMAX, or DOLBY" })
    }),
    status: z.enum(["active", "inactive"]).optional()
})

// UPDATE validation - all fields optional, theaterId not allowed (immutable)
const screenUpdateSchema = z.object({
    screenName: z.string().min(1, "Screen name cannot be empty").optional(),
    totalSeats: z.number().int().positive("Total seats must be greater than 0").optional(),
    screenType: z.enum(["2D", "3D", "IMAX", "DOLBY"], {
        errorMap: () => ({ message: "screenType must be 2D, 3D, IMAX, or DOLBY" })
    }).optional(),
    status: z.enum(["active", "inactive"]).optional()
}).strict()

// Common validation handler
const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
        const formattedErrors = result.error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message
        }))
        return res.status(400).json({
            success: false,
            message: "validation failed. please check your input",
            error: formattedErrors
        })
    }
    req.body = result.data
    next()
}

// ID param validation
const validateObjectId = (paramName = "id") => (req, res, next) => {
    const id = req.params[paramName]
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: `Invalid ${paramName} format`
        })
    }
    next()
}

module.exports = {
    validateScreenCreate: validate(screenCreateSchema),
    validateScreenUpdate: validate(screenUpdateSchema),
    validateObjectId,
    // Backward compatibility
    screenCreationValidate: validate(screenCreateSchema)
}