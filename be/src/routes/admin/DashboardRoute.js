const express = require("express");
const router = express.Router();
const dashboardController = require("../../controllers/admin/DashboardController");
const md = require("../../middlewares/authmidleware");

router.get(
  "/admin/totalSukuCadang",
  md.authenticateToken,
  md.authorize("superadmin"),
  dashboardController.totalSukuCadang
);

router.get(
  "/admin/totalBengkel",
  md.authenticateToken,
  md.authorize("superadmin"),
  dashboardController.totalBengkel
);

router.get(
  "/admin/totalTransaksiSukuCadang",
  md.authenticateToken,
  md.authorize("superadmin"),
  dashboardController.totalTransaksiSukuCadang
);


module.exports = router;
