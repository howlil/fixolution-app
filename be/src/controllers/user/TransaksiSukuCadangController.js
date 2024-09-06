const { prisma } = require("../../configs/prisma");
const yup = require("yup");
const axios = require("axios");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../../public/images/payments"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("bukti_bayar");

const transactionSchema = yup.object().shape({
  suku_cadang_id: yup.string().required("Suku cadang harus dipilih"),
  jumlah: yup
    .number()
    .required("Jumlah harus diisi")
    .positive("Jumlah harus lebih besar dari 0"),
  kode_pos: yup.string().required("Kode pos harus diisi"),
  alamat: yup.string().required("Alamat detail harus diisi"),
  kurir: yup.string().required("Kurir harus dipilih"),
});

// API untuk menambahkan barang ke keranjang
exports.addToCart = async (req, res) => {
  try {
    const { suku_cadang_id, jumlah } = req.body;

    // Cek apakah suku cadang ada
    const sukuCadang = await prisma.sukucadang.findUnique({
      where: { id: suku_cadang_id },
    });

    if (!sukuCadang) {
      return res.status(404).json({
        message: "Suku cadang tidak ditemukan",
        success: false,
      });
    }

    // Tambah barang ke keranjang
    const cartItem = await prisma.keranjang_items.create({
      data: {
        keranjang_id: req.userId, // Keranjang ID dari user yang login
        sukucadang_id: suku_cadang_id,
        harga: sukuCadang.harga,
        jumlah: jumlah,
        total_harga: sukuCadang.harga * jumlah,
      },
    });

    res.status(201).json({
      message: "Barang berhasil ditambahkan ke keranjang",
      data: cartItem,
      success: true,
    });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({
      message: "Database error",
      success: false,
    });
  }
};

exports.createTransactionWithPayment = (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
      return res.status(500).json({ success: false, message: "Server error" });
    }

    try {
      const validData = await transactionSchema.validate(req.body);

      // Cek apakah suku cadang ada
      const sukuCadang = await prisma.sukucadang.findUnique({
        where: { id: validData.suku_cadang_id },
      });

      if (!sukuCadang) {
        return res.status(404).json({
          message: "Suku cadang tidak ditemukan",
          success: false,
        });
      }

      // Hitung biaya pengiriman dengan Biteship API
      const response = await axios.post("https://api.biteship.com/v1/rates", {
        origin_postal_code: 12440, // Kode pos asal dari bengkel
        destination_postal_code: validData.kode_pos,
        couriers: validData.kurir,
        items: [
          {
            name: sukuCadang.nama,
            description: sukuCadang.deskripsi,
            value: sukuCadang.harga,
            length: sukuCadang.length,
            width: sukuCadang.width,
            height: sukuCadang.height,
            weight: sukuCadang.weight,
            quantity: validData.jumlah,
          },
        ],
      });

      const shippingCosts = response.data.data[0].price;

      // Buat transaksi baru
      const transaction = await prisma.transaksi.create({
        data: {
          user_id: req.userId, // ID user yang login
          keranjang_id: null, // Jika tidak dari keranjang
          sukucadang_id: validData.suku_cadang_id,
          jumlah: validData.jumlah,
          alamat: validData.alamat,
          kode_pos: validData.kode_pos,
          bukti_pembayaran: req.file.filename, // Mengambil nama file bukti pembayaran
          status: "MENUNGGU_KONFIRMASI",
          biaya_pengiriman: shippingCosts,
          total_harga: sukuCadang.harga * validData.jumlah + shippingCosts,
        },
      });

      // Simpan ke dalam model transaksi_sukucadang
      await prisma.transaksi_sukucadang.create({
        data: {
          transaksi_id: transaction.id,
          sukucadang_id: validData.suku_cadang_id,
          total_barang: validData.jumlah,
          total_harga: sukuCadang.harga * validData.jumlah,
        },
      });

      res.status(201).json({
        message: "Transaksi berhasil dibuat, menunggu konfirmasi",
        data: transaction,
        success: true,
      });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        return res.status(400).json({
          message: err.errors[0],
          success: false,
        });
      } else {
        console.error("Database error:", err);
        return res.status(500).json({
          message: "Database error",
          success: false,
        });
      }
    }
  });
};

// API untuk konfirmasi transaksi oleh admin bengkel
exports.confirmTransaction = async (req, res) => {
  const { transaksi_id, status, pesan_bengkel } = req.body;

  try {
    const transaction = await prisma.transaksi.update({
      where: { id: transaksi_id },
      data: {
        status: status === "DITERIMA" ? "DALAM_PENGIRIMAN" : "DITOLAK",
        pesan_bengkel: pesan_bengkel || "",
      },
    });

    res.status(200).json({
      message: `Transaksi ${status === "DITERIMA" ? "diterima" : "ditolak"}`,
      data: transaction,
      success: true,
    });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({
      message: "Database error",
      success: false,
    });
  }
};

exports.removeFromCart = async (req, res) => {
  const { item_id } = req.params;

  try {
    // Cek apakah item ada di keranjang
    const cartItem = await prisma.keranjang_items.findUnique({
      where: { id: item_id },
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Item tidak ditemukan di keranjang",
        success: false,
      });
    }

    // Hapus item dari keranjang
    await prisma.keranjang_items.delete({
      where: { id: item_id },
    });

    res.status(200).json({
      message: "Item berhasil dihapus dari keranjang",
      success: true,
    });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({
      message: "Database error",
      success: false,
    });
  }
};

const editCartSchema = yup.object().shape({
  jumlah: yup
    .number()
    .required("Jumlah barang harus diisi")
    .positive("Jumlah harus lebih besar dari 0"),
});

exports.editCartItem = async (req, res) => {
  const { item_id } = req.params;

  try {
    const validData = await editCartSchema.validate(req.body);

    // Cek apakah item ada di keranjang
    const cartItem = await prisma.keranjang_items.findUnique({
      where: { id: item_id },
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Item tidak ditemukan di keranjang",
        success: false,
      });
    }

    // Update jumlah barang di keranjang
    const updatedItem = await prisma.keranjang_items.update({
      where: { id: item_id },
      data: {
        jumlah: validData.jumlah,
        total_harga: cartItem.harga * validData.jumlah,
      },
    });

    res.status(200).json({
      message: "Jumlah barang berhasil diupdate",
      data: updatedItem,
      success: true,
    });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({
        message: err.errors[0],
        success: false,
      });
    } else {
      console.error("Database error:", err);
      return res.status(500).json({
        message: "Database error",
        success: false,
      });
    }
  }
};

exports.getCartItems = async (req, res) => {
  try {
    // Ambil semua item di keranjang user yang sedang login
    const cartItems = await prisma.keranjang_items.findMany({
      where: { user_id: req.userId },
      include: {
        sukucadang: true, // Include detail suku cadang
      },
    });

    if (cartItems.length === 0) {
      return res.status(404).json({
        message: "Keranjang kosong",
        success: false,
      });
    }

    res.status(200).json({
      message: "Berhasil mengambil item di keranjang",
      data: cartItems,
      success: true,
    });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({
      message: "Database error",
      success: false,
    });
  }
};
