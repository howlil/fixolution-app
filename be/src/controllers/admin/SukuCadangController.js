const { prisma } = require('../../configs/prisma');
const yup = require('yup');
const multer = require('multer');
const path = require('path');


const sukucadangSchema = yup.object().shape({
    nama: yup.string().required(),
    deskripsi: yup.string().required(),
    harga: yup.number().required().positive(),
    stok: yup.number().required().min(1),
    foto: yup.string().required()
});

exports.addSukucadang = async (req, res) => {
    try {
        const validData = await sukucadangSchema.validate({
            ...req.body,
            foto: req.file ? req.file.filename : undefined
        });
        const existingSukucadang = await prisma.sukucadang.findFirst({
            where: {
                nama: validData.nama,
            },
        });

        if (existingSukucadang) {
            return res.status(400).json({
                message: "Suku cadang sudah ada",
                data: null,
                success: false,
            });
        }

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
        cb(null, Date.now() + "-" + file.originalname);
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
exports.getAllSukuCadang = async (req, res) => {
    try {
        const sukuCadangs = await prisma.sukucadang.findMany();
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