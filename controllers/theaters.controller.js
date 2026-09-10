const { sendSuccessResponse,sendErrorResponse}=require("../utils/sendResponse")


// 1. Clean Import: Only import the exact functions you need
const { 
    createTheaters, 
    DeleteTheatersId, 
    searchTheaters, 
    updateId 
} = require('../services/theaters.service');

// 2. Import the utility functions for clean responses


// ==========================================
// CREATE THEATER
// ==========================================
exports.createTheater = async (req, res) => {
    try {
        // Pass the request body directly to the service
        const newTheater = await createTheaters(req.body);
        
        // 201 is the standard HTTP status code for "Created"
        sendSuccessResponse(res, 201, newTheater, 'Theater created successfully');
        
    } catch (error) {
        // 400 Bad Request is standard for validation errors (e.g., missing required fields)
        sendErrorResponse(res, 400, error.message);
    }
};

// ==========================================
// SEARCH THEATERS
// ==========================================
exports.searchTheatersController = async (req, res) => {
    try {
        const searchTerm = req.query.q;

        // Validate that the user actually typed something
        if (!searchTerm || searchTerm.trim() === '') {
            return sendErrorResponse(res, 400, 'Please provide a search term using ?q=your_search');
        }

        const theaters = await searchTheaters(searchTerm.trim());
        
        sendSuccessResponse(res, 200, theaters, 'Theaters retrieved successfully');
        
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
};

// ==========================================
// UPDATE THEATER (Handles both PUT and PATCH)
// ==========================================
exports.updateTheater = async (req, res) => {
    try {
        const theatersId = req.params.id;
        const updateData = req.body;

        // Call your specific 'updateId' service function
        const updatedTheater = await updateId(theatersId, updateData);
        
        sendSuccessResponse(res, 200, updatedTheater, 'Theater updated successfully');
        
    } catch (error) {
        // Check if the error is an invalid MongoDB ID format (CastError) vs Not Found
        const statusCode = error.name === 'CastError' ? 400 : 404;
        sendErrorResponse(res, statusCode, error.message);
    }
};

// ==========================================
// DELETE THEATER
// ==========================================
exports.deleteTheater = async (req, res) => {
    try {
        const theatersId = req.params.id;

        // Call your specific 'DeleteTheatersId' service function
        const deletedTheater = await DeleteTheatersId(theatersId);
        
        sendSuccessResponse(res, 200, deletedTheater, 'Theater deleted successfully');
        
    } catch (error) {
        // Check if the error is an invalid MongoDB ID format (CastError) vs Not Found
        const statusCode = error.name === 'CastError' ? 400 : 404;
        sendErrorResponse(res, statusCode, error.message);
    }
};