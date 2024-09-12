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
router.get(
  "/cartItem/:item_id",
  md.authenticateToken,
  transactionController.getCartItem
);
router.get(
  "/pesanan/:id_pesanan",
  md.authenticateToken,
  transactionController.getPesananById
);

// Route untuk mengedit item di keranjang
router.put(
  "/editItem",
  md.authenticateToken,
  transactionController.editCartItem
);

// Route untuk menghapus item dari keranjang
router.delete(
  "/removeCart",
  md.authenticateToken,
  transactionController.removeFromCart
);

// Route untuk membuat transaksi langsung
router.post(
  "/pesan",
  md.authenticateToken,
  transactionController.createPesanan
);
router.put(
  "/bayar/:id_pesanan",
  md.authenticateToken,
  transactionController.upload.single("bukti_pembayaran"),
  transactionController.uploadBuktiPembayaran
);

// Route untuk admin konfirmasi transaksi
router.put(
  "/confirm-transaction",
  md.authenticateToken,
  md.authorize("bengkel", "superadmin"),
  transactionController.confirmTransaction
);

module.exports = router;
