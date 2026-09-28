const { z } = require("zod")

// ERROR FIXED: Schema now matches the Mongoose model (screen-model.js)
// Model expects: screenType: "2D" | "3D" | "IMAX" | "DOLBY" (string)
// OLD: screenType: z.array(z.object({ screenType: z.enum(...) })) ← array of objects, wrong
const screenValidate = z.object({
    screenName: z.string().min(1, "screenName cannot be empty"),
    theaterId: z.string().min(1, "theaterId is required").optional(), // ERROR FIXED: Made optional for updates
    totalSeats: z.number().int().min(1, "totalSeats must be at least 1"), // ERROR FIXED: min(1) not min(0)
    screenType: z.enum(["2D", "3D", "IMAX", "DOLBY"], {
        errorMap: () => ({ message: "screenType must be 2D, 3D, IMAX, or DOLBY" })
    }),
    status: z.enum(["active", "inactive"]).optional() // ERROR FIXED: Optional, matches model default
})

const screenCreationValidate = (req, res, next) => {
    const result = screenValidate.safeParse(req.body)
    if (!result.success) {
        // ERROR FIXED: Zod uses 'issues' not 'errors'
        // OLD: result.error.errors.map(...)
        const formattedErrors = result.error.issues.map((err) => {
            return {
                field: err.path.join("."),
                message: err.message
            }
        })
        return res.status(400).json({
            success: false,
            message: "validation failed. please check your input",
            error: formattedErrors
        })
    }
    req.body = result.data
    next()
}

module.exports = { screenCreationValidate }