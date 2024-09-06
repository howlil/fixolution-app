const { prisma } = require('../../configs/prisma');
const yup = require('yup');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');

const bengkelSchema = yup.object().shape({
  nama_bengkel: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required(),
  no_hp: yup.string().required(),
  alamat: yup.string().required(),
  status: yup.mixed().oneOf(['Aktif', 'TidakAktif']).required(),
  gmaps_link: yup.string().optional().url(),
  foto: yup.array().of(yup.string().required()), // Pastikan ini sesuai dengan array file
});

exports.addBengkel = async (req, res) => {
  try {
    let validData = await bengkelSchema.validate({
      ...req.body,
      fotos: req.files ? req.files.map(file => file.filename) : []
    });

    const existingBengkel = await prisma.bengkel.findUnique({
      where: { username: validData.username }
    });

    if (existingBengkel) {
      return res.status(400).json({
        message: "Username sudah ada, gunakan username lain",
        data: null,
        success: false,
      });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validData.password, salt);
    validData = { ...validData, password: hashedPassword };

    const newBengkel = await prisma.bengkel.create({
      data: {
        nama_bengkel: validData.nama_bengkel,
        username: validData.username,
        password: validData.password,
        no_hp: validData.no_hp,
        alamat: validData.alamat,
        status: validData.status,
        gmaps_link: validData.gmaps_link,
        foto: {  // Perubahan di sini karena model `foto` dalam bentuk tunggal
          create: validData.fotos.map(foto => ({ foto }))
        }
      },
    });

    return res.status(201).json({
      message: "Bengkel berhasil ditambahkan",
      data: newBengkel,
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

// Setting multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../public/images/bengkel'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new multer.MulterError("LIMIT_UNEXPECTED_FILE");
    error.message = "Jenis File Tidak Diizinkan, Hanya JPEG dan PNG yang Diizinkan";
    return cb(error, false);
  }
  cb(null, true);
};

exports.uploadFoto = multer({ 
  storage: storage, 
  fileFilter: fileFilter 
}).array("fotos", 10);

exports.editBengkel = async (req, res) => {
  try {
    const { id } = req.params;

    let validData = await bengkelSchema.validate({
      ...req.body,
      fotos: req.files ? req.files.map(file => file.filename) : []
    });

    const existingBengkel = await prisma.bengkel.findUnique({
      where: { id },
      include: { foto: true } 
    });

    if (!existingBengkel) {
      return res.status(404).json({
        message: "Bengkel tidak ditemukan",
        data: null,
        success: false,
      });
    }

    if (validData.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(validData.password, salt);
      validData.password = hashedPassword;
    }

    if (validData.fotos.length > 0) {
      await prisma.foto.deleteMany({
        where: { bengkel_id: id }
      });

      await prisma.foto.createMany({
        data: validData.fotos.map(foto => ({
          foto,
          bengkel_id: id 
        }))
      });
    }

    const updatedBengkel = await prisma.bengkel.update({
      where: { id },
      data: {
        nama_bengkel: validData.nama_bengkel,
        username: validData.username,
        password: validData.password,
        no_hp: validData.no_hp,
        alamat: validData.alamat,
        status: validData.status,
        gmaps_link: validData.gmaps_link,
      }
    });

    return res.status(200).json({
      message: "Bengkel berhasil diperbarui",
      data: updatedBengkel,
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

exports.deleteBengkel = async (req, res) => {
  try {
    const { id } = req.params;

    const existingBengkel = await prisma.bengkel.findUnique({
      where: { id },
    });

    if (!existingBengkel) {
      return res.status(404).json({
        message: "Bengkel tidak ditemukan",
        data: null,
        success: false,
      });
    }

    const deletedBengkel = await prisma.bengkel.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "Bengkel berhasil dihapus",
      data: deletedBengkel,
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

exports.getAllBengkel = async (req, res) => {
  try {
    const bengkelList = await prisma.bengkel.findMany({
      include: {
        foto: true, // Sesuaikan dengan skema foto dalam bentuk tunggal
      },
    });
    if (bengkelList.length === 0) {
      return res.status(404).json({
        message: "Tidak ada data bengkel",
        data: null,
        success: false,
      });
    }
    return res.status(200).json({
      message: "Berhasil mengambil semua bengkel",
      data: bengkelList,
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

exports.getBengkelById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const bengkel = await prisma.bengkel.findUnique({
      where: { id },
      include: {
        foto: true, // Sesuaikan dengan skema foto dalam bentuk tunggal
      },
    });

    if (!bengkel) {
      return res.status(404).json({
        message: "Bengkel tidak ditemukan",
        data: null,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Berhasil mengambil bengkel",
      data: bengkel,
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
