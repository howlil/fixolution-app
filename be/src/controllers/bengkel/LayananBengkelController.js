const { prisma } = require("../../configs/prisma");
const yup = require("yup");

// Validasi data layanan
const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

const layananSchema = yup.object().shape({
  nama_layanan: yup.string().required("Nama layanan diperlukan"),
  harga: yup
    .number()
    .required("Harga diperlukan")
    .positive("Harga harus lebih besar dari 0"),
  deskripsi: yup.string().nullable(),
  jam_buka: yup
    .string()
    .matches(timeRegex, "Format jam buka tidak valid")
    .nullable(),
  jam_tutup: yup
    .string()
    .matches(timeRegex, "Format jam tutup tidak valid")
    .nullable(),
});

// Tambah Layanan Bengkel
exports.tambahLayananBengkel = async (req, res) => {
  try {
    const bengkel_id = req.userType === "superadmin" ? req.params.bengkel_id : req.userId;


    const validData = await layananSchema.validate(req.body, { abortEarly: false });

    const existingBengkel = await prisma.bengkel.findUnique({ where: { id: bengkel_id } });

    if (!existingBengkel) {
      return res.status(404).json({ message: "Bengkel tidak ditemukan", success: false });
    }

    const existingLayanan = await prisma.layanan.findFirst({
      where: {
        nama_layanan: validData.nama_layanan,
        bengkel_id: bengkel_id,
      },
    });

    if (existingLayanan) {
      return res.status(400).json({ message: "Nama layanan sudah ada", success: false });
    }

    const newLayanan = await prisma.layanan.create({
      data: {
        ...validData,
        bengkel_id: bengkel_id,
      },
    });

    return res.status(201).json({ message: "Layanan berhasil ditambahkan", data: newLayanan, success: true });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({ message: err.errors.join(", "), success: false });
    } else {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", success: false });
    }
  }
};

// Get Semua Layanan Berdasarkan Bengkel
exports.getAllLayanan = async (req, res) => {
  const bengkel_id = req.userType === "superadmin" ? req.params.bengkel_id : req.userId;


  try {

    const layanan = await prisma.layanan.findMany({
      where: { bengkel_id },
      include: {
        bengkel: { include: { foto: true } }, // Sertakan foto dari bengkel
      },
    });


    if (!layanan || layanan.length === 0) {
      return res.status(404).json({ message: "Tidak ada layanan yang ditemukan", success: false });
    }

    return res.status(200).json({ message: "Layanan berhasil ditemukan", data: layanan, success: true });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ message: "Database error", success: false });
  }
};

// Get Layanan Berdasarkan ID
exports.getLayananById = async (req, res) => {
  try {
    const { id } = req.params;

    const layanan = await prisma.layanan.findUnique({ where: { id } });

    if (!layanan) {
      return res.status(404).json({ message: "Layanan tidak ditemukan", success: false });
    }

    return res.status(200).json({ message: "Layanan berhasil ditemukan", data: layanan, success: true });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ message: "Database error", success: false });
  }
};

// Update Layanan Berdasarkan ID
exports.updateLayanan = async (req, res) => {
  try {
    const { id } = req.params;

    const existingLayanan = await prisma.layanan.findUnique({ where: { id } });

    if (!existingLayanan) {
      return res.status(404).json({ message: "Layanan tidak ditemukan", success: false });
    }

    const validData = await layananSchema.validate(req.body, { abortEarly: false });

    const updatedLayanan = await prisma.layanan.update({
      where: { id },
      data: validData,
    });

    return res.status(200).json({ message: "Layanan berhasil diperbarui", data: updatedLayanan, success: true });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({ message: err.errors.join(", "), success: false });
    } else {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", success: false });
    }
  }
};

// Hapus Layanan Berdasarkan ID
exports.deleteLayanan = async (req, res) => {
  try {
    const { id } = req.params;

    const existingLayanan = await prisma.layanan.findUnique({ where: { id } });

    if (!existingLayanan) {
      return res.status(404).json({ message: "Layanan tidak ditemukan", success: false });
    }

    await prisma.layanan.delete({ where: { id } });

    return res.status(200).json({ message: "Layanan berhasil dihapus", success: true });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ message: "Database error", success: false });
  }
};
