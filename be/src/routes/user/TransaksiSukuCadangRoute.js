const express = require("express");
const router = express.Router();
const transactionController = require("../../controllers/user/TransaksiSukuCadangController");
const md = require("../../middlewares/authmidleware");

// Route untuk menambahkan barang ke keranjang
router.post(
  "/add-to-cart",
  md.authenticateToken,
  transactionController.addToCart
);

// Route untuk menampilkan item yang ada di keranjang
router.get(
  "/cartItems",
  md.authenticateToken,
  transactionController.getCartItems
);

// Route untuk mengedit item di keranjang
router.put(
  "/editItem/:item_id",
  md.authenticateToken,
  transactionController.editCartItem
);

// Route untuk menghapus item dari keranjang
router.delete(
  "/removeCart/:item_id",
  md.authenticateToken,
  transactionController.removeFromCart
);

// Route untuk membuat transaksi langsung
router.post(
  "/createTransaction",
  md.authenticateToken,
  transactionController.createTransactionWithPayment
);

// Route untuk admin konfirmasi transaksi
router.put(
  "/confirm-transaction",
  md.authenticateToken,
  md.authorize("bengkel", "superadmin"),
  transactionController.confirmTransaction
);

module.exports = router;
