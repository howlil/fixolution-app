const { prisma } = require('../../configs/prisma');
const yup = require('yup');
const multer = require('multer');
const path = require('path');


exports.addSukucadang = async (req, res) => {
    
const sukucadangSchema = yup.object().shape({
    nama: yup.string().required(),
    barang: yup.string().required(),
    deskripsi: yup.string().required(),
    merek: yup.string().required(),
    harga: yup.number().required().positive(),
});
    try {
        const validData = await sukucadangSchema.validate(req.body);

        const newSukucadang = await prisma.sukucadang.create({
            data: validData,
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


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === "foto") {
        cb(null, path.join(__dirname, "../../../public/images/sukucadang"));
      }
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const fileFilter = function (req, file, cb) {
  if (file.fieldname === "foto") {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new multer.MulterError("LIMIT_UNEXPECTED_FILE");
      error.message = "Jenis File Tidak Diizinkan, Hanya JPEG dan PNG yang Diizinkan";
      return cb(error, false);
    }
  } else {
    cb(new Error("Invalid field name"), false);
  }
  cb(null, true);
};

exports.uploadFoto = multer({ storage: storage, fileFilter: fileFilter }).single("foto");


exports.editSukucadang = async (req, res) => {
    const editSukucadangSchema = yup.object().shape({
        nama: yup.string().required(),
        barang: yup.string().required(),
        deskripsi: yup.string().required(),
        merek: yup.string().required(),
        harga: yup.number().required().positive(),
    });
    try {
        const validData = await editSukucadangSchema.validate(req.body);
        const { id } = req.params;

        const updatedSukucadang = await prisma.sukucadang.update({
            where: { id },
            data: validData,
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
exports.deleteSukucadang = async (req, res) => {
    try {
        const { id } = req.params;

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

exports.getAllSukuCadang = async (req, res) => {
    try {
        const sukuCadangs = await prisma.sukucadang.findMany();

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

exports.getSukuCadangById = async (req, res) => {
    try {
        const { id } = req.params;

        const sukuCadang = await prisma.sukucadang.findUnique({
            where: { id },
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
