const express = require("express");
const router = express.Router();
const ServiceToGoController = require("../../controllers/bengkel/ServiceToGo");
const md = require("../../middlewares/authmidleware");

router.post(
  "/request",
  md.authenticateToken,
  md.authorize("user","superadmin"),
  ServiceToGoController.requestServiceToGo
);

// Admin menyetujui atau menolak request
router.put(
  "/respond/:request_id",
  md.authenticateToken,
  md.authorize("bengkel","superadmin"),
  ServiceToGoController.respondToServiceToGoRequest
);

// Admin mengambil daftar request berdasarkan status
router.get(
  "/requests",
  md.authenticateToken,
  ServiceToGoController.getServiceToGoRequestsByStatus
);

router.get(
  "/allRequests",
  md.authenticateToken,
  ServiceToGoController.getAllServiceRequests
);

module.exports = router;
