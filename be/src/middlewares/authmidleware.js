const jwt = require("jsonwebtoken");
const prisma = require("../configs/prisma");


exports.authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Masukkan token terlebih dahulu",
      });
    }

    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
      return res.status(401).json({
        success: false,
        message: "Token tidak ditemukan dalam header",
      });


    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Token tidak valid atau telah kadaluwarsa",
        });
      }

     const isToken=  await prisma.prisma.token.findFirst({
        where: { token },
      })


      if (!isToken) {
        return res.status(401).json({
          success: false,
          message: "Token tidak ditemukan atau sudah logout sebelumnya",
        });
      }

      req.userId = decoded.id;
      req.userType = decoded.userType;
      next();
    });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

exports.authorize = (...requiredTypes) => {
  return (req, res, next) => {
    if (!requiredTypes.includes(req.userType)) {
          return res.status(403).json({
              message: "tidak ada hak akses",
              data: null,
              success: false,
          });
      }
      next();
  };
};
