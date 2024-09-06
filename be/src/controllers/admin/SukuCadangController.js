const { prisma } = require('../../configs/prisma');
const yup = require('yup');
const multer = require('multer');
const path = require('path');

// Schema validasi untuk suku cadang
const sukucadangSchema = yup.object().shape({
  nama: yup.string().required(),
  deskripsi: yup.string().required(),
  harga: yup.number().required().positive(),
  stok: yup.number().required().min(1),
  merek_id: yup.string().required(),
  foto: yup.string().required(),
  lebar: yup.number().required("Lebar harus diisi").positive(),
  tinggi: yup.number().required("Tinggi harus diisi").positive(),
  panjang: yup.number().required("Panjang harus diisi").positive(),
  berat: yup.number().required("Berat harus diisi").positive(),
});

// Setup untuk upload foto suku cadang
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../../public/images/sukucadang"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new multer.MulterError("LIMIT_UNEXPECTED_FILE");
    error.message = "Jenis file tidak diizinkan, hanya JPEG dan PNG yang diizinkan";
    return cb(error, false);
  }
  cb(null, true);
};

exports.uploadFoto = multer({ storage: storage, fileFilter: fileFilter }).single("foto");

// Tambah suku cadang baru
exports.addSukucadang = async (req, res) => {
  try {
    const validData = await sukucadangSchema.validate({
      ...req.body,
      foto: req.file ? req.file.filename : undefined
    });

    const existingSukucadang = await prisma.sukucadang.findFirst({
      where: { nama: validData.nama },
    });

    if (existingSukucadang) {
      return res.status(400).json({
        message: "Suku cadang sudah ada",
        data: null,
        success: false,
      });
    }

    const merekExists = await prisma.merek.findUnique({
      where: { id: validData.merek_id },
    });

    if (!merekExists) {
      return res.status(400).json({
        message: "Merek tidak ditemukan, pastikan merek_id valid",
        success: false,
      });
    }

    const newSukucadang = await prisma.sukucadang.create({
      data: {
        nama: validData.nama,
        deskripsi: validData.deskripsi,
        harga: validData.harga,
        stok: validData.stok,
        foto: validData.foto,
        merek_id: validData.merek_id,
        lebar: validData.lebar,
        tinggi: validData.tinggi,
        panjang: validData.panjang,
        berat: validData.berat,
      },
    });

    return res.status(201).json({
      message: "Suku cadang berhasil ditambahkan",
      data: newSukucadang,
      success: true,
    });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({
        message: err.errors[0],
        data: null,
        success: false,
      });
    } else {
      console.error('Database error:', err);
      return res.status(500).json({
        message: "Database error",
        data: null,
        success: false,
      });
    }
  }
};

// Edit suku cadang
exports.editSukucadang = async (req, res) => {
  try {
    const { id } = req.params;

    const validData = await sukucadangSchema.validate({
      ...req.body,
      foto: req.file ? req.file.filename : undefined
    });

    const existingSukucadang = await prisma.sukucadang.findFirst({
      where: {
        AND: [
          { nama: validData.nama },
          { NOT: { id } }
        ]
      }
    });

    if (existingSukucadang) {
      return res.status(400).json({
        message: "Suku cadang dengan nama yang sama sudah ada",
        data: null,
        success: false,
      });
    }

    const updatedSukucadang = await prisma.sukucadang.update({
      where: { id },
      data: {
        nama: validData.nama,
        deskripsi: validData.deskripsi,
        harga: validData.harga,
        stok: validData.stok,
        foto: validData.foto,
        merek_id: validData.merek_id,
        lebar: validData.lebar,
        tinggi: validData.tinggi,
        panjang: validData.panjang,
        berat: validData.berat,
      },
    });

    return res.status(200).json({
      message: "Suku cadang berhasil diperbarui",
      data: updatedSukucadang,
      success: true,
    });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({
        message: err.errors[0],
        data: null,
        success: false,
      });
    } else {
      console.error('Database error:', err);
      return res.status(500).json({
        message: "Database error",
        data: null,
        success: false,
      });
    }
  }
};

// Hapus suku cadang
exports.deleteSukucadang = async (req, res) => {
  try {
    const { id } = req.params;

    const existingSukucadang = await prisma.sukucadang.findUnique({
      where: { id },
    });

    if (!existingSukucadang) {
      return res.status(404).json({
        message: "Suku cadang tidak ditemukan",
        data: null,
        success: false,
      });
    }

    const deletedSukucadang = await prisma.sukucadang.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "Suku cadang berhasil dihapus",
      data: deletedSukucadang,
      success: true,
    });
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({
      message: "Database error",
      data: null,
      success: false,
    });
  }
};

// Ambil semua suku cadang
exports.getAllSukuCadang = async (req, res) => {
  try {
    const sukuCadangs = await prisma.sukucadang.findMany({
      include: {
        merek: true, // Mengambil relasi dengan tabel merek
      },
    });
    if (sukuCadangs.length === 0) {
      return res.status(404).json({
        message: "Tidak ada suku cadang",
        data: null,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Berhasil mengambil semua suku cadang",
      data: sukuCadangs,
      success: true,
    });
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({
      message: "Database error",
      data: null,
      success: false,
    });
  }
};

// Ambil suku cadang berdasarkan ID
exports.getSukuCadangById = async (req, res) => {
  try {
    const { id } = req.params;

    const sukuCadang = await prisma.sukucadang.findUnique({
      where: { id },
      include: {
        merek: true, // Mengambil relasi dengan tabel merek
      },
    });

    if (!sukuCadang) {
      return res.status(404).json({
        message: "Suku cadang tidak ditemukan",
        data: null,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Berhasil mengambil suku cadang",
      data: sukuCadang,
      success: true,
    });
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({
      message: "Database error",
      data: null,
      success: false,
    });
  }
};
