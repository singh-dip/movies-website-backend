const { isValidObjectId } = require('mongoose');
const ShowTime = require('../models/showtime.model'); // ✅ Capital 'S' to match your export
const Movies = require('../models/movies-model');
const screens = require('../models/screen-model');
const theaters = require('../models/Theaters.model');

// =========================================================
// 1. CREATE SHOWTIME
// =========================================================
const createShowTime = async (showTimeData) => {
    const { moviesId, theaterId, screenId, showDateTime } = showTimeData;

    // ✅ FIX: Use throw new Error instead of return(400) in a service
    if (!isValidObjectId(moviesId) || !isValidObjectId(theaterId) || !isValidObjectId(screenId)) {
        throw new Error('Invalid ID format for movie, theater, or screen.');
    }

    const movies_Id = await Movies.findById(moviesId);
    if (!movies_Id) throw new Error("Movie not found. Please check the movieId.");

    const theater_Id = await theaters.findById(theaterId);
    if (!theater_Id) throw new Error("Theater not found. Please check the theaterId.");

    const screen_Id = await screens.findById(screenId);
    if (!screen_Id) throw new Error("Screen not found. Please check the screenId.");

    const currentTime = new Date();
    const startTime = new Date(showDateTime);

    if (startTime <= currentTime) {
        throw new Error("Showtime cannot be scheduled in the past.");
    }

    const durationMs = movies_Id.durationInMinutes * 60000;
    const bufferMs = 15 * 60000;
    const endDateTime = new Date(startTime.getTime() + durationMs + bufferMs);

    const overlappingShow = await ShowTime.findOne({
        screenId: screenId,
        status: { $in: ["upcoming", "live"] },
        $or: [
            { showDateTime: { $lt: endDateTime, $gte: startTime } },
            { endDateTime: { $gt: startTime, $lte: endDateTime } }
        ]
    });

    if (overlappingShow) {
        throw new Error("This screen is already booked for the selected time slot.");
    }

    const finalData = {
        ...showTimeData,
        showDateTime: startTime,
        endDateTime: endDateTime,
        availableSeats: screen_Id.totalSeats,
        status: "upcoming"
    };

    const result = await ShowTime.create(finalData);
    if (!result) throw new Error("Failed to create showtime.");

    return result;
};

// =========================================================
// 2. UPDATE SHOWTIME
// =========================================================
const showTimeUpdate = async (Data_id, Data) => {
    // ✅ FIX: Capital 'S' in ShowTime
    const existingShowTime = await ShowTime.findById(Data_id);
    if (!existingShowTime) throw new Error("Showtime not found.");

    if (existingShowTime.status === "live" || existingShowTime.status === "completed") {
        throw new Error("Cannot update a showtime that is currently playing or finished.");
    }

    // ✅ FIX: Removed 'status' and 'availableSeats' to prevent hackers from changing them directly
    const allowedFields = ["language", "showDateTime", "format", "baseTicketPrice"];
    const allowedUpdates = {};

    allowedFields.forEach((field) => {
        if (Data[field] !== undefined) {
            allowedUpdates[field] = Data[field];
        }
    });

    if (Data.showDateTime) {
        // ✅ FIX: Capital 'D' in Date
        const newStartTime = new Date(Data.showDateTime);
        const currentStartTime = new Date();
        
        if (newStartTime <= currentStartTime) {
            throw new Error("Cannot reschedule a showtime to the past.");
        }

        const moviesData = await Movies.findById(existingShowTime.movieId);
        const durationMs = moviesData.durationInMinutes * 60000;
        const bufferMs = 15 * 60000;
        const newEndTime = new Date(newStartTime.getTime() + durationMs + bufferMs);
        
        allowedUpdates.showDateTime = newStartTime;
        allowedUpdates.endDateTime = newEndTime;

        const overlap = await ShowTime.findOne({
            screenId: existingShowTime.screenId,
            status: { $in: ['upcoming', 'live'] },
            _id: { $ne: Data_id }, // Exclude self
            showDateTime: { $lt: newEndTime },
            endDateTime: { $gt: newStartTime }
        });

        if (overlap) throw new Error("This screen is already booked for the new time slot.");
    }

    // ✅ FIX: Capital 'O' in Object
    if (Object.keys(allowedUpdates).length === 0) {
        throw new Error("No valid fields provided for update.");
    }

    // ✅ FIX: Method is findByIdAndUpdate, not findOneUpdate. Capital 'S' in ShowTime.
    const updateShow = await ShowTime.findByIdAndUpdate(
        Data_id,
        { $set: allowedUpdates },
        { new: true, runValidators: true }
    );

    if (!updateShow) throw new Error('Failed to update showtime.');
    
    return updateShow;
};

// =========================================================
// 3. DELETE SHOWTIME (Hard Delete for upcoming only)
// =========================================================
const showTimeDelete = async (showTimeDeleteId) => {
    if (!isValidObjectId(showTimeDeleteId)) {
        throw new Error("Invalid Showtime ID format.");
    }

    // ✅ FIX: Method is findById, not findOneById. Capital 'S' in ShowTime.
    const existingShow = await ShowTime.findById(showTimeDeleteId);
    if (!existingShow) {
        throw new Error("Showtime not found. Cannot delete something that doesn't exist.");
    }

    // ✅ FIX: Correct logical OR syntax
    if (existingShow.status === 'live' || existingShow.status === 'completed') {
        throw new Error("Cannot delete a showtime that is currently playing or already finished.");
    }

    const deleteShow = await ShowTime.findByIdAndDelete(showTimeDeleteId);
    if (!deleteShow) {
        throw new Error("Failed to delete the showtime from the database.");
    }

    return deleteShow;
};

// =========================================================
// 4. GET ALL SHOWTIMES (With Pagination)
// =========================================================
const getAllShowTime = async (requestFilters) => {
    const query = {};

    if (requestFilters.movieId) query.movieId = requestFilters.movieId;
    if (requestFilters.theaterId) query.theaterId = requestFilters.theaterId;

    // ✅ FIX: Flipped the logic. If NO status is provided, default to upcoming/live.
    if (requestFilters.status) {
        query.status = requestFilters.status;
    } else {
        query.status = { $in: ["upcoming", "live"] };
    }

    const limit = 5; // You can change this to 10 later
    const page = Math.max(1, Number(requestFilters.page) || 1);
    const skip = (page - 1) * limit;

    const totalShowTime = await ShowTime.countDocuments(query);

    const showTimeList = await ShowTime.find(query)
        .populate("movieId", "title durationInMinutes")
        .populate("theaterId", "name")
        .populate("screenId", "name totalSeats")
        .sort({ showDateTime: 1 })
        .skip(skip)
        .limit(limit);

    return {
        success: true,
        data: showTimeList,
        pagination: {
            currentPage: page,
            limit: limit,
            totalShowTimes: totalShowTime,
            totalPages: Math.ceil(totalShowTime / limit),
            hasNextPage: page < Math.ceil(totalShowTime / limit),
            hasPreviousPage: page > 1
        }
    };
};

// =========================================================
// 5. GET SHOWTIME BY ID
// =========================================================
const getShowTimeById = async (ShowTimeId) => {
    // ✅ FIX: Added '!' to check if it is NOT valid
    if (!isValidObjectId(ShowTimeId)) {
        throw new Error("Invalid showtime ID format.");
    }

    // ✅ FIX: Use findById, not find. Populate ONLY references (ObjectIds), not strings/dates.
    const showTimeResult = await ShowTime.findById(ShowTimeId)
        .populate("movieId", "title durationInMinutes posterUrl")
        .populate("theaterId", "name location")
        .populate("screenId", "name totalSeats seatLayout");

    if (!showTimeResult) {
        throw new Error("Showtime not found.");
    }

    if (showTimeResult.status === "cancelled") {
        throw new Error("This showtime has been cancelled.");
    }

    const currentTime = Date.now();
    const tenDaysAgo = currentTime - (10 * 24 * 60 * 60 * 1000);
    
    // ✅ FIX: Variable name is showTimeResult, and status is "completed"
    if (showTimeResult.status === "completed" && new Date(showTimeResult.endDateTime).getTime() < tenDaysAgo) {
        throw new Error("This showtime is no longer available.");
    }

    return {
        success: true,
        data: showTimeResult
    };
};

// =========================================================
// 🌟 6. NEW FEATURE: GET SHOWTIMES BY DATE (Highly Recommended)
// =========================================================
const getShowtimesByDate = async (targetDate) => {
    // Create start and end of the target day
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const showtimes = await ShowTime.find({
        showDateTime: { $gte: startOfDay, $lte: endOfDay },
        status: { $in: ["upcoming", "live"] }
    })
    .populate("movieId", "title posterUrl")
    .populate("theaterId", "name")
    .populate("screenId", "name")
    .sort({ showDateTime: 1 });

    return { success: true, data: showtimes };
};

// =========================================================
// 🌟 7. NEW FEATURE: CANCEL SHOWTIME (Soft Delete)
// =========================================================
const cancelShowtime = async (showtimeId, reason = "Admin cancelled") => {
    if (!isValidObjectId(showtimeId)) throw new Error("Invalid Showtime ID format.");

    const existingShow = await ShowTime.findById(showtimeId);
    if (!existingShow) throw new Error("Showtime not found.");

    if (existingShow.status === "completed") {
        throw new Error("Cannot cancel a showtime that has already finished.");
    }

    // Soft delete: Just change the status instead of deleting the record
    const cancelledShow = await ShowTime.findByIdAndUpdate(
        showtimeId,
        { $set: { status: "cancelled", cancellationReason: reason } },
        { new: true }
    );

    return { success: true, data: cancelledShow, message: "Showtime cancelled successfully." };
};

// ✅ Export ALL functions, including the new ones!
module.exports = { 
    createShowTime, 
    showTimeUpdate, 
    showTimeDelete, 
    getAllShowTime, 
    getShowTimeById,
    getShowtimesByDate,    // 🌟 New
    cancelShowtime         // 🌟 New
};