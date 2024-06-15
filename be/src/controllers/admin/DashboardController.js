const prisma = require('../../configs/prisma')

exports.totalSukuCadang = async (req, res) => {
    try {
        const totalSukuCadang = await prisma.prisma.sukucadang.count();
        res.status(200).json({ totalSukuCadang: totalSukuCadang || 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.totalBengkel = async (req, res) => {
    try {
        const totalBengkel = await prisma.prisma.bengkel.count();
        res.status(200).json({ totalBengkel: totalBengkel || 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.totalTransaksiSukuCadang = async (req, res) => {
    try {
        const totalTransaksiSukuCadang = await prisma.prisma.transaksiSukucadang.count();
        res.status(200).json({ totalTransaksiSukuCadang: totalTransaksiSukuCadang || 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}