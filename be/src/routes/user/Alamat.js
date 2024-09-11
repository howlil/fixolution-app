const express = require("express");
const router = express.Router();

const alamatController = require("../../controllers/user/Alamat");
const md = require("../../middlewares/authmidleware");

// Route untuk menambahkan alamat baru\
router.post("/alamat", md.authenticateToken, alamatController.createAddress);
router.get("/alamats", md.authenticateToken, alamatController.getAddress);
router.put("/alamat/:id", md.authenticateToken, alamatController.updateAddress);
router.delete("/alamat/:id", md.authenticateToken, alamatController.deleteAddress);

module.exports = router;
