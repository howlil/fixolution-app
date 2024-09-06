const { prisma } = require('../../configs/prisma');
const yup = require('yup');

// Schema validasi untuk merek
const merekSchema = yup.object().shape({
  nama_merek: yup.string().required("Nama merek diperlukan"),
});

// Create Merek (POST /api/merek)
exports.addMerek = async (req, res) => {
  try {
    const validData = await merekSchema.validate(req.body);

    // Cek apakah nama merek sudah ada menggunakan findFirst
    const existingMerek = await prisma.merek.findFirst({
      where: { nama_merek: validData.nama_merek }, // Menggunakan findFirst
    });

    if (existingMerek) {
      return res.status(400).json({
        message: "Nama merek sudah ada",
        success: false,
      });
    }

    // Buat merek baru
    const newMerek = await prisma.merek.create({
      data: validData,
    });

    res.status(201).json({
      message: "Merek berhasil ditambahkan",
      data: newMerek,
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

// Get All Merek (GET /api/merek)
exports.getAllMerek = async (req, res) => {
  try {
    const mereks = await prisma.merek.findMany();
    if (mereks.length === 0) {
      return res.status(404).json({
        message: "Tidak ada merek yang ditemukan",
        success: false,
      });
    }
    res.status(200).json({
      message: "Berhasil mengambil semua merek",
      data: mereks,
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

// Get Merek by ID (GET /api/merek/:id)
exports.getMerekById = async (req, res) => {
  try {
    const { id } = req.params;
    const merek = await prisma.merek.findUnique({
      where: { id },
    });

    if (!merek) {
      return res.status(404).json({
        message: "Merek tidak ditemukan",
        success: false,
      });
    }

    res.status(200).json({
      message: "Merek berhasil ditemukan",
      data: merek,
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

// Update Merek (PUT /api/merek/:id)
exports.updateMerek = async (req, res) => {
  try {
    const { id } = req.params;
    const validData = await merekSchema.validate(req.body);

    // Cek apakah merek dengan nama yang sama sudah ada
    const existingMerek = await prisma.merek.findFirst({
      where: {
        AND: [{ nama_merek: validData.nama_merek }, { NOT: { id } }],
      },
    });

    if (existingMerek) {
      return res.status(400).json({
        message: "Nama merek sudah ada",
        success: false,
      });
    }

    // Update merek
    const updatedMerek = await prisma.merek.update({
      where: { id },
      data: validData,
    });

    res.status(200).json({
      message: "Merek berhasil diperbarui",
      data: updatedMerek,
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

// Delete Merek (DELETE /api/merek/:id)
exports.deleteMerek = async (req, res) => {
  try {
    const { id } = req.params;

    const existingMerek = await prisma.merek.findUnique({
      where: { id },
    });

    if (!existingMerek) {
      return res.status(404).json({
        message: "Merek tidak ditemukan",
        success: false,
      });
    }

    // Hapus merek
    await prisma.merek.delete({
      where: { id },
    });

    res.status(200).json({
      message: "Merek berhasil dihapus",
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
