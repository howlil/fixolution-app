const express = require("express");
const router = express.Router();
const bengkelController = require("../../controllers/admin/KelolaBengkelController");
const {
  authenticateToken,
  authorize,
} = require("../../middlewares/authmidleware");

router.post(
  "/admin/addBengkel",
  authenticateToken,
  authorize("superadmin"),
  bengkelController.uploadFoto,
  bengkelController.addBengkel
);
router.delete(
  "/admin/deleteBengkel/:id",
  authenticateToken,
  authorize("superadmin"),
  bengkelController.deleteBengkel
);
router.put(
  "/admin/editBengkel/:id",
  authenticateToken,
  authorize("superadmin"),
  bengkelController.uploadFoto,
  bengkelController.editBengkel
);
router.get(
  "/admin/getAllBengkel",
  bengkelController.getAllBengkel
);
router.get(
  "/admin/getBengkelById/:id",
  bengkelController.getBengkelById
);

module.exports = router;
