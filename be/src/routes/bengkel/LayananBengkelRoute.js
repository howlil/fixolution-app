const express = require("express");
const router = express.Router();
const layananController = require("../../controllers/bengkel/LayananBengkelController");
const {
  authenticateToken,
  authorize,
} = require("../../middlewares/authmidleware");

router.post(
    "/:bengkel_id/addLayananBengkel",
    authenticateToken,
    authorize("superadmin","bengkel"),
    layananController.tambahLayananBengkel
  );
  
  router.get(
    "/:bengkel_id/getAllLayananBengkel",
    layananController.getAllLayanan
  );
  
  router.get(
    "/:bengkel_id/getLayananBengkelById/:id",
    layananController.getLayananById
  );
  
  router.put(
    "/:bengkel_id/editLayananBengkel/:id",
    authenticateToken,
    authorize("superadmin","bengkel"),
    layananController.updateLayanan
  );
  
  router.delete(
    "/:bengkel_id/deleteLayananBengkel/:id",
    authenticateToken,
    authorize("superadmin","bengkel"),
    layananController.deleteLayanan
  );
  
  module.exports = router;