const { prisma } = require("../../configs/prisma");
const yup = require("yup");

const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

const layananSchema = yup.object().shape({
  nama_layanan: yup.string().required("Nama layanan diperlukan"), // Ganti namaLayanan menjadi nama_layanan
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

exports.tambahLayananBengkel = async (req, res) => {
  try {
    const { bengkel_id } = req.params;
    const validData = await layananSchema.validate(req.body, {
      abortEarly: false,
    });

    const existingBengkel = await prisma.bengkel.findUnique({
      where: { id: bengkel_id },
    });

    if (!existingBengkel) {
      return res.status(404).json({
        message: "Bengkel tidak ditemukan",
        data: null,
        success: false,
      });
    }

    const existingLayanan = await prisma.layanan.findFirst({
      where: {
        AND: [
          { nama_layanan: validData.nama_layanan }, // Ganti namaLayanan menjadi nama_layanan
          { bengkel_id: bengkel_id },
        ],
      },
    });

    if (existingLayanan) {
      return res.status(400).json({
        message: "Nama layanan sudah ada",
        data: null,
        success: false,
      });
    }

    const newLayanan = await prisma.layanan.create({
      data: {
        ...validData,
        bengkel_id: bengkel_id,
      },
    });

    return res.status(201).json({
      message: "Layanan berhasil ditambahkan",
      data: newLayanan,
      success: true,
    });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({
        message: err.errors.join(", "),
        data: null,
        success: false,
      });
    } else {
      console.error("Database error:", err);
      return res.status(500).json({
        message: "Database error",
        data: null,
        success: false,
      });
    }
  }
};

exports.getAllLayanan = async (req, res) => {
  try {
    const layanan = await prisma.layanan.findMany({
      include: {
        bengkel: {
          include: {
            foto: true,
          },
        },
      },
    });
    if (layanan.length === 0) {
      return res.status(404).json({
        message: "Tidak ada layanan yang ditemukan",
        data: null,
        success: false,
      });
    }
    return res.status(200).json({
      message: "Layanan berhasil ditemukan",
      data: layanan,
      success: true,
    });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({
      message: "Database error",
      data: null,
      success: false,
    });
  }
};

exports.getLayananById = async (req, res) => {
  try {
    const { id } = req.params;

    const layanan = await prisma.layanan.findUnique({
      where: { id },
    });

    if (!layanan) {
      return res.status(404).json({
        message: "Layanan tidak ditemukan",
        data: null,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Layanan berhasil ditemukan",
      data: layanan,
      success: true,
    });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({
      message: "Database error",
      data: null,
      success: false,
    });
  }
};

exports.updateLayanan = async (req, res) => {
  try {
    const { id } = req.params;
    const existingLayanan = await prisma.layanan.findUnique({
      where: { id },
    });

    if (!existingLayanan) {
      return res.status(404).json({
        message: "Layanan tidak ditemukan",
        data: null,
        success: false,
      });
    }

    const validData = await layananSchema.validate(req.body, {
      abortEarly: false,
    });

    const updatedLayanan = await prisma.layanan.update({
      where: { id },
      data: validData,
    });

    return res.status(200).json({
      message: "Layanan berhasil diperbarui",
      data: updatedLayanan,
      success: true,
    });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({
        message: err.errors.join(", "),
        data: null,
        success: false,
      });
    } else {
      console.error("Database error:", err);
      return res.status(500).json({
        message: "Database error",
        data: null,
        success: false,
      });
    }
  }
};

exports.deleteLayanan = async (req, res) => {
  try {
    const { id } = req.params;
    const existingLayanan = await prisma.layanan.findUnique({
      where: { id },
    });

    if (!existingLayanan) {
      return res.status(404).json({
        message: "Layanan tidak ditemukan",
        data: null,
        success: false,
      });
    }

    await prisma.layanan.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "Layanan berhasil dihapus",
      success: true,
    });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({
      message: "Database error",
      data: null,
      success: false,
    });
  }
};
