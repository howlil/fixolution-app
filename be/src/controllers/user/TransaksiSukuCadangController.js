const { prisma } = require("../../configs/prisma");
const yup = require("yup");
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

exports.upload = multer({ storage: storage });

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

    // Cek apakah keranjang sudah ada untuk user ini
    let userCart = await prisma.keranjang.findFirst({
      where: { user_id: req.userId },
    });

    // Jika keranjang tidak ada, buat keranjang baru dengan total_harga = 0
    if (!userCart) {
      userCart = await prisma.keranjang.create({
        data: {
          user_id: req.userId, // Ensure this is coming from authenticated user
          total_harga: 0, // Initialize the cart's total price as 0
        },
      });
    }

    // Cek apakah barang dengan suku_cadang_id sudah ada di keranjang
    let existingCartItem = await prisma.keranjang_items.findFirst({
      where: {
        keranjang_id: userCart.id,
        sukucadang_id: suku_cadang_id,
      },
    });

    if (existingCartItem) {
      // Jika barang sudah ada, tambahkan jumlah dan update total_harga
      const updatedCartItem = await prisma.keranjang_items.update({
        where: { id: existingCartItem.id },
        data: {
          jumlah: {
            increment: jumlah, // Tambahkan jumlah barang
          },
          total_harga: {
            increment: sukuCadang.harga * jumlah, // Update total harga barang
          },
        },
      });

      // Update total harga di keranjang setelah item diupdate
      await prisma.keranjang.update({
        where: { id: userCart.id },
        data: {
          total_harga: {
            increment: sukuCadang.harga * jumlah, // Tambahkan harga barang ke total harga keranjang
          },
        },
      });

      return res.status(200).json({
        message: "Jumlah barang di keranjang berhasil diupdate",
        data: updatedCartItem,
        success: true,
      });
    } else {
      // Jika barang belum ada, tambahkan item baru ke keranjang
      const newCartItem = await prisma.keranjang_items.create({
        data: {
          keranjang_id: userCart.id, // Menggunakan keranjang ID dari user
          sukucadang_id: suku_cadang_id,
          harga: sukuCadang.harga,
          jumlah: jumlah,
          total_harga: sukuCadang.harga * jumlah,
        },
      });

      // Update total harga di keranjang setelah item ditambahkan
      await prisma.keranjang.update({
        where: { id: userCart.id },
        data: {
          total_harga: {
            increment: sukuCadang.harga * jumlah, // Tambah total harga ke keranjang
          },
        },
      });

      return res.status(201).json({
        message: "Barang berhasil ditambahkan ke keranjang",
        data: newCartItem,
        success: true,
      });
    }
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({
      message: "Database error",
      success: false,
    });
  }
};

const transactionSchema = yup.object().shape({
  keranjang_id: yup.string().nullable(), // Tambahkan validasi untuk keranjang_id
  alamat_id: yup.string().required("Alamat pengiriman harus dipilih"),
  suku_cadang: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required("ID suku cadang harus diisi"),
        jumlah: yup
          .number()
          .required("Jumlah harus diisi")
          .positive("Jumlah harus lebih dari 0"),
      })
    )
    .min(1, "Minimal ada satu suku cadang yang dipilih")
    .required("Suku cadang harus diisi"),
});

exports.createPesanan = async (req, res) => {
  try {
    const validData = await transactionSchema.validate(req.body);

    const { alamat_id, suku_cadang, keranjang_id } = validData;

    // Cek apakah alamat pengiriman ada
    const alamatPengiriman = await prisma.alamat_pengiriman.findUnique({
      where: { id: alamat_id },
    });

    if (!alamatPengiriman) {
      return res.status(404).json({
        message: "Alamat pengiriman tidak ditemukan",
        success: false,
      });
    }

    // Buat transaksi baru
    const transaksi = await prisma.transaksi.create({
      data: {
        user_id: req.userId,
        keranjang_id: keranjang_id,
        alamat_id,
        status: "MENUNGGU_PEMBAYARAN",
      },
    });

    let totalTransaksiHarga = 0;

    // Loop melalui array `suku_cadang` yang ada di request
    for (const item of suku_cadang) {
      const sukuCadang = item.sukucadang; // Ambil data `sukucadang` dari keranjang item

      // Cek apakah suku cadang ditemukan
      if (!sukuCadang) {
        return res.status(404).json({
          message: `Suku cadang dengan ID ${item.sukucadang_id} tidak ditemukan`,
          success: false,
        });
      }

      // Cek stok
      if (sukuCadang.stok < item.jumlah) {
        return res.status(400).json({
          message: `Stok untuk ${sukuCadang.nama} tidak mencukupi`,
          success: false,
        });
      }

      // Buat transaksi_sukucadang
      await prisma.transaksi_sukucadang.create({
        data: {
          transaksi_id: transaksi.id,
          sukucadang_id: sukuCadang.id,
          total_barang: item.jumlah,
          total_harga: sukuCadang.harga * item.jumlah,
        },
      });

      // Kurangi stok suku cadang
      await prisma.sukucadang.update({
        where: { id: sukuCadang.id },
        data: { stok: sukuCadang.stok - item.jumlah },
      });

      // Hitung total harga transaksi
      totalTransaksiHarga += sukuCadang.harga * item.jumlah;

      // Hapus item dari keranjang (jika diperlukan)
      await prisma.keranjang_items.deleteMany({
        where: {
          keranjang_id: keranjang_id,
          sukucadang_id: sukuCadang.id,
        },
      });
    }

    // Tidak perlu update `total_harga` di transaksi karena sudah dihitung di transaksi_sukucadang

    // Kirim response sukses
    res.status(201).json({
      message: "Pesanan berhasil dibuat, silakan lanjutkan pembayaran",
      data: transaksi,
      total_harga: totalTransaksiHarga, // Berikan informasi total harga di response
      success: true,
    });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({
        message: err.errors[0],
        success: false,
      });
    }

    console.error("Error saat membuat pesanan:", err);
    res.status(500).json({
      message: "Terjadi kesalahan saat membuat pesanan",
      success: false,
    });
  }
};

exports.getPesananById = async (req, res) => {
  const { id_pesanan } = req.params; // Mengambil ID pesanan dari URL params

  try {
    // Cari transaksi berdasarkan ID
    const pesanan = await prisma.transaksi.findUnique({
      where: { id: id_pesanan },
      include: {
        alamat_pengiriman: true, // Ambil data alamat pengiriman
        transaksi_sukucadang: {
          include: {
            sukucadang: true, // Ambil data detail suku cadang dari transaksi
          },
        },
        user: {
          select: {
            nama: true, // Ambil nama user
            no_hp: true, // Mengubah nomor_hp menjadi no_hp sesuai model Prisma
          },
        },
      },
    });

    if (!pesanan) {
      return res.status(404).json({
        message: "Pesanan tidak ditemukan",
        success: false,
      });
    }

    // Menghitung total produk dan total harga
    const totalProduk = pesanan.transaksi_sukucadang.reduce((total, item) => total + item.total_barang, 0);
    const totalHarga = pesanan.transaksi_sukucadang.reduce((total, item) => total + item.total_harga, 0);

    // Menyusun data untuk response

    const response = {
      kontak: {
        nama: pesanan.user.nama,
        nomor_hp: pesanan.user.no_hp, // Menggunakan no_hp sesuai dengan model yang benar
      },
      alamat: {
        provinsi: pesanan.alamat_pengiriman.provinsi,
        kota: pesanan.alamat_pengiriman.kota,
        kecamatan: pesanan.alamat_pengiriman.kecamatan,
        kelurahan: pesanan.alamat_pengiriman.kelurahan,
        alamat_lengkap: pesanan.alamat_pengiriman.alamat,
      },
      metode_pembayaran: pesanan.status === "MENUNGGU_PEMBAYARAN" ? "Scan" : "Metode Lain", // Ini contoh, bisa disesuaikan
      detail_pesanan: pesanan.transaksi_sukucadang.map((item) => ({
        nama: item.sukucadang.nama,
        kuantitas: item.total_barang,
        harga: item.total_harga,
        foto: item.sukucadang.foto,
      })),
      ringkasan_pesanan: {
        total_produk: totalProduk,
        total_harga: totalHarga,
        biaya_pengiriman: pesanan.biaya_pengiriman || 0, // Tambahkan biaya pengiriman jika ada
        total: totalHarga + (pesanan.biaya_pengiriman || 0),
      },
    };

    // Kirim response sukses dengan data pesanan
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("Error saat mengambil pesanan:", error);
    res.status(500).json({
      message: "Terjadi kesalahan server",
      success: false,
    });
  }
};


exports.uploadBuktiPembayaran = async (req, res) => {
  try {
    // Ambil transaksi_id dari params (atau body jika diperlukan)
    const { id_pesanan } = req.params; // atau req.body jika dikirim via body

    console.log("transaksi_id:", id_pesanan);

    if (!id_pesanan) {
      return res.status(400).json({ success: false, message: "ID transaksi tidak ditemukan" });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Bukti pembayaran harus diunggah" });
    }

    // Cari transaksi berdasarkan ID (pastikan id adalah string)
    const transaksi = await prisma.transaksi.findUnique({
      where: { id: id_pesanan },
    });

    if (!transaksi) {
      return res.status(404).json({
        success: false,
        message: "Transaksi tidak ditemukan",
      });
    }

    // Update transaksi dengan path file bukti pembayaran
    const updatedTransaksi = await prisma.transaksi.update({
      where: { id: id_pesanan },
      data: {
        bukti_pembayaran: req.file.filename, 
        status: "MENUNGGU_KONFIRMASI", 
      },
    });

    res.status(200).json({
      success: true,
      message: "Bukti pembayaran berhasil diunggah",
      data: updatedTransaksi,
    });
  } catch (error) {
    console.error("Error saat mengunggah bukti pembayaran:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};



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
  const { item_id } = req.body;

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
  const { item_id } = req.body;

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
    const userCart = await prisma.keranjang.findFirst({
      where: {
        user_id: req.userId, // Use req.userId, which should be the logged-in user's ID
      },
    });

    // If no cart exists for this user
    if (!userCart) {
      return res.status(404).json({
        message: "Keranjang kosong",
        success: false,
      });
    }

    // Fetch all items in the user's cart
    const cartItems = await prisma.keranjang_items.findMany({
      where: { keranjang_id: userCart.id }, // Use keranjang_id to fetch cart items
      include: {
        sukucadang: {
          include: {
            merek: true,
          },
        }, // Include suku cadang details
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

exports.getCartItem = async (req, res) => {
  const { item_id } = req.params;

  try {
    const userCart = await prisma.keranjang.findFirst({
      where: {
        user_id: req.userId, // Use userId from req.params
      },
    });

    // If no cart exists for this user
    if (!userCart) {
      return res.status(404).json({
        message: "Keranjang kosong",
        success: false,
      });
    }

    // Fetch the specific item in the user's cart
    const cartItem = await prisma.keranjang_items.findFirst({
      where: {
        keranjang_id: userCart.id, // Use keranjang_id to fetch cart item
        id: item_id, // Use keranjang_items_id to fetch specific item
      },
      include: {
        sukucadang: {
          include: {
            merek: true,
          },
        }, // Include suku cadang details
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Item tidak ditemukan di keranjang",
        success: false,
      });
    }

    res.status(200).json({
      message: "Berhasil mengambil item di keranjang",
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
