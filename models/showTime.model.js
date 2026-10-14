// models/Showtime.js
const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({

  // ══════════════════════════════════════════════
  // 🔗 1. RELATIONAL REFERENCES (The Connections)
  // ══════════════════════════════════════════════
  
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: [true, "Movie is required"]
  },
  
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "theatersName",
    required: [true, "Theater is required"]
  },
  
  screenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Screen", // The physical screen/room
    required: [true, "Cinema Hall is required"]
  },
  
   language: {
    type: String,
    enum: ['English', 'Hindi', 'Tamil', 'Telugu', 'Spanish', 'French'],
    required: true
  },

  // ══════════════════════════════════════════════
  // 📅 2. DATE & TIME (The Schedule)
  // ══════════════════════════════════════════════
  
  showDateTime: {
    type: Date,
    required: [true, "Show start date and time are required"]
  },
  
  endDateTime: {
    type: Date,
    required: [true, "Show end date and time are required"]
    // ⚠️ NOTE: This should be auto-calculated in your controller 
    // using: Movie.duration + 15 mins buffer for ads/cleaning.
  },

  // ══════════════════════════════════════════════
  // 🎞️ 3. SHOW ATTRIBUTES (The Experience)
  // ══════════════════════════════════════════════
  
  format: {
    type: String,
    enum: ["2D", "3D", "IMAX", "IMAX 3D", "4DX", "Dolby Atmos"],
    default: "2D",
    required: true
    // ⚠️ NOTE: Even if the Hall is an IMAX hall, the admin must specify 
    // if THIS specific movie is being shown in 2D or 3D.
  },

  // ══════════════════════════════════════════════
  // 💰 4. PRICING & SEATS (The Inventory)
  // ══════════════════════════════════════════════
  
  baseTicketPrice: {
    type: Number,
    required: [true, "Base ticket price is required"],
    min: [0, "Price cannot be negative"]
    // ⚠️ NOTE: This is the BASE price. The final price the user pays 
    // will be calculated dynamically using this base price + the Seat's priceMultiplier.
  },

  availableSeats: {
    type: Number,
    required: [true, "Available seats count is required"],
    min: [0, "Available seats cannot be negative"]
    // ⚠️ NOTE: When creating the showtime, copy the `totalSeats` from 
    // the CinemaHall schema into this field. This number DECREASES when booked.
  },

  // ══════════════════════════════════════════════
  // 🚦 5. STATUS & METADATA (The Lifecycle)
  // ══════════════════════════════════════════════
  
  status: {
    type: String,
    enum: ["upcoming", "live", "completed", "cancelled"],
    default: "upcoming"
  },

  isSpecialShow: {
    type: Boolean,
    default: false
    // Used for "Premiere", "Fan Morning Show", "Marathon", etc.
  },

  // Optional: If you want to restrict when people can book (e.g., "Bookings open 3 days prior")
  // bookingOpensAt: { type: Date }, 

}, { 
  timestamps: true // Automatically adds createdAt and updatedAt
});


// ══════════════════════════════════════════════════════════
// 🚀 6. DATABASE INDEXES (CRITICAL FOR PERFORMANCE)
// ══════════════════════════════════════════════════════════
// Without these, your database will be very slow when users search for movies.

// 1. Prevents the admin from booking two movies in the same hall at the same time.
showtimeSchema.index({ hall: 1, showDateTime: 1, endDateTime: 1 });

// 2. Speeds up user searches: "Show me all times for Movie X on Date Y"
showtimeSchema.index({ movie: 1, showDateTime: 1 });

// 3. Speeds up user searches: "Show me all movies playing at Theater X today"
showtimeSchema.index({ theater: 1, showDateTime: 1 });


module.exports = mongoose.model('Showtime', showtimeSchema);