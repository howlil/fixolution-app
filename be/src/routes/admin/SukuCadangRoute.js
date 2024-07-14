const express = require("express");
const router = express.Router();
const SukuCadangController = require("../../controllers/admin/SukuCadangController");
const {
  authenticateToken,
  authorize,
} = require("../../middlewares/authmidleware");

router.post(
  "/admin/addSukuCadang",
  authenticateToken,
  authorize("superadmin"),
  SukuCadangController.uploadFoto,
  SukuCadangController.addSukucadang
);
router.put(
  "/admin/editSukuCadang/:id",
  authenticateToken,
  authorize("superadmin"),
  SukuCadangController.uploadFoto,
  SukuCadangController.editSukucadang
);
router.delete(
  "/admin/deleteSukucadang/:id",
  authenticateToken,
  authorize("superadmin"),
  SukuCadangController.deleteSukucadang
);
router.get(
  "/getAllSukuCadang",
  SukuCadangController.getAllSukuCadang
);

router.get(
  "/getSukuCadangById/:id",
  SukuCadangController.getSukuCadangById
);

module.exports = router;
