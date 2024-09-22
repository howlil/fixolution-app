const { prisma } = require("../../configs/prisma");
const yup = require("yup");

// Schema validasi untuk request Service to Go
const requestSchema = yup.object().shape({
  bengkel_id: yup.string().required("Bengkel harus dipilih"),
  gmaps_link: yup.string().required("Link Google Maps diperlukan"),
  deskripsi: yup.string().required("Deskripsi masalah diperlukan"),
});

exports.requestServiceToGo = async (req, res) => {
  try {
    const validData = await requestSchema.validate(req.body);

    // Cek apakah bengkel yang dipilih ada
    const bengkel = await prisma.bengkel.findUnique({
      where: { id: validData.bengkel_id },
    });

    if (!bengkel) {
      return res.status(404).json({
        message: "Bengkel tidak ditemukan",
        success: false,
      });
    }

    // Buat request baru
    const newRequest = await prisma.servicetogo_request.create({
      data: {
        user_id: req.userId, // ID user yang mengirim request (dari auth middleware)
        bengkel_id: validData.bengkel_id,
        gmaps_link: validData.gmaps_link,
        deskripsi: validData.deskripsi,
        status: "PENDING", // Status default adalah PENDING
        pesan_bengkel: "", // Admin akan menambahkan pesan jika menolak
      },
    });

    res.status(201).json({
      message: "Request Service to Go berhasil dikirim",
      data: newRequest,
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

exports.respondToServiceToGoRequest = async (req, res) => {
  const { request_id } = req.params;
  const { status, pesan_bengkel } = req.body;

  try {
    const request = await prisma.servicetogo_request.findUnique({
      where: { id: request_id },
    });

    if (!request) {
      return res.status(404).json({
        message: "Request tidak ditemukan",
        success: false,
      });
    }

    // Update status request (APPROVED/REJECTED)
    const updatedRequest = await prisma.servicetogo_request.update({
      where: { id: request_id },
      data: {
        status: status.toUpperCase(),
        pesan_bengkel: pesan_bengkel,
      },
    });

    return res.status(200).json({
      message: `Request berhasil ${
        status === "APPROVED" ? "disetujui" : "ditolak"
      }`,
      data: updatedRequest,
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

// Ambil semua request berdasarkan status
exports.getServiceToGoRequestsByStatus = async (req, res) => {
  const { status } = req.query;

  try {
    // Ambil daftar request berdasarkan status
    const requests = await prisma.servicetogo_request.findMany({
      where: {
        status: status.toUpperCase(),
        bengkel_id: req.admin.bengkel_id, // Hanya request ke bengkel yang dikelola admin
      },
      include: {
        user: true, // Include detail user yang mengirim request
      },
    });

    if (requests.length === 0) {
      return res.status(404).json({
        message: `Tidak ada request dengan status ${status}`,
        success: false,
      });
    }

    res.status(200).json({
      message: "Berhasil mengambil daftar request",
      data: requests,
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

exports.getAllServiceRequests = async (req, res) => {
  try {
    const requests = await prisma.servicetogo_request.findMany({
      where: {
        user_id: req.userId, 
      },
      include: {
        user: true, // Mengambil detail user yang mengirim request
        bengkel: {
          include: { foto: true },
        },
      },
    });

    if (requests.length === 0) {
      return res.status(404).json({
        message: "Tidak ada request Service to Go yang ditemukan",
        success: false,
      });
    }

    res.status(200).json({
      message: "Berhasil mengambil semua request Service to Go",
      data: requests,
      type: "Service To Go",
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

exports.getAllServiceRequest = async (req, res) => {
  try {
    const requests = await prisma.servicetogo_request.findMany({
      where: {
        bengkel_id: req.userId, // Hanya request yang dikirim oleh user yang sedang login
      },
      include: {
        user: true, // Mengambil detail user yang mengirim request
        bengkel:true
      },
    });

    if (requests.length === 0) {
      return res.status(404).json({
        message: "Tidak ada request Service to Go yang ditemukan",
        success: false,
      });
    }

    res.status(200).json({
      message: "Berhasil mengambil semua request Service to Go",
      data: requests,
      type: "Service To Go",
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
