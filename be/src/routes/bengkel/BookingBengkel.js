const express = require("express");
const router = express.Router();
const BookingController = require("../../controllers/bengkel/BookingBengkel");
const md = require("../../middlewares/authmidleware");

// User membuat booking layanan bengkel
router.post(
  "/booking",
  md.authenticateToken,
  md.authorize("user"),
  BookingController.bookLayanan
);

// Admin menyetujui atau menolak booking
router.put(
  "/booking/respond/:booking_id",
  md.authenticateToken,
  md.authorize("bengkel","superadmin"),
  BookingController.respondToBooking
);

// Admin mengambil semua booking
router.get(
  "/bookings",
  md.authenticateToken,
  md.authorize("bengkel", "superadmin"),
  BookingController.getAllBookings
);

module.exports = router;
