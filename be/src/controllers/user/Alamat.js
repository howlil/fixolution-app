const { prisma } = require("../../configs/prisma");
const yup = require("yup");

const addressSchema = yup.object().shape({
    provinsi: yup
      .string()
      .required('Provinsi harus diisi')
      .min(3, 'Provinsi minimal terdiri dari 3 karakter'),
    
    kota: yup
      .string()
      .required('Kota harus diisi')
      .min(3, 'Kota minimal terdiri dari 3 karakter'),
  
    kecamatan: yup
      .string()
      .required('Kecamatan harus diisi')
      .min(3, 'Kecamatan minimal terdiri dari 3 karakter'),
  
    kode_pos: yup
      .string()
      .required('Kode pos harus diisi')
      .matches(/^\d{5}$/, 'Kode pos harus terdiri dari 5 angka'),
  
    alamat: yup
      .string()
      .required('Alamat detail harus diisi')
      .min(10, 'Alamat detail minimal terdiri dari 10 karakter'),
  });

  exports.createAddress = async (req, res) => {
    try {
      // Validasi data request
      await addressSchema.validate(req.body, { abortEarly: false });
  
      const { provinsi, kota, kecamatan, kode_pos, alamat } = req.body;
      const userId = req.userId; // User ID dari token
  
      // Buat alamat baru
      const newAddress = await prisma.alamat_pengiriman.create({
        data: {
          user_id: userId,
          provinsi,
          kota,
          kecamatan,
          kode_pos,
          alamat,
        },
      });
  
      res.status(201).json({
        success: true,
        message: "Alamat berhasil dibuat",
        data: newAddress,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({
          success: false,
          message: "Validasi gagal",
          errors: error.errors,
        });
      }
  
      res.status(500).json({ success: false, message: "Gagal membuat alamat" });
    }
  };
  
  exports.getAddress = async (req, res) => {
    try {  
      // Cari alamat berdasarkan ID
      const address = await prisma.alamat_pengiriman.findMany({
        where: { user_id: req.userId },
      });
  
      if (!address) {
        return res.status(404).json({
          success: false,
          message: "Alamat tidak ditemukan",
        });
      }
  
      res.status(200).json({
        success: true,
        data: address,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Gagal mengambil alamat" });
    }
  };
  
  exports.updateAddress = async (req, res) => {
    try {
      const addressId = req.params.id;
  
      // Validasi data request
      await addressSchema.validate(req.body, { abortEarly: false });
  
      const { provinsi, kota, kecamatan, kode_pos, alamat } = req.body;
  
      // Update alamat berdasarkan ID
      const updatedAddress = await prisma.alamat_pengiriman.update({
        where: { id: addressId },
        data: {
          provinsi,
          kota,
          kecamatan,
          kode_pos,
          alamat,
        },
      });
  
      res.status(200).json({
        success: true,
        message: "Alamat berhasil diperbarui",
        data: updatedAddress,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({
          success: false,
          message: "Validasi gagal",
          errors: error.errors,
        });
      }
  
      res.status(500).json({ success: false, message: "Gagal memperbarui alamat" });
    }
  };
  
  exports.deleteAddress = async (req, res) => {
    try {
      const addressId = req.params.id;
  
      // Hapus alamat berdasarkan ID
      const deletedAddress = await prisma.alamat_pengiriman.delete({
        where: { id: addressId },
      });
  
      res.status(200).json({
        success: true,
        message: "Alamat berhasil dihapus",
        data: deletedAddress,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Gagal menghapus alamat" });
    }
  };