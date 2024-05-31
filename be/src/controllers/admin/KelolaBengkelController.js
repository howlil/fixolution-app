const { prisma } = require('../../configs/prisma');
const yup = require('yup');



exports.addBengkel = async (req, res) => {
    const bengkelSchema = yup.object().shape({
        namaBengkel: yup.string().required(),
        pemilik: yup.string().required(),
        nomorTelp: yup.string().required(),
        alamat: yup.string(),
        fotoBengkel: yup.string(),
        status: yup.string().oneOf(['AKTIF', 'TIDAKAKTIF']).required(),
    });
    try {
        
        const validData = await bengkelSchema.validate(req.body);

        const newBengkel = await prisma.bengkel.create({
            data: {
                nama: validData.namaBengkel,
                pemilik: validData.pemilik,
                nomorTelp: validData.nomorTelp,
                alamat: validData.alamat || null,
                foto: validData.fotoBengkel || null,
                status: validData.status,
            },
        });

        return res.status(201).json({
            status: 201,
            message: "Bengkel berhasil ditambahkan",
            data: newBengkel,
            success: true,
        });
    } catch (err) {
        if (err instanceof yup.ValidationError) {
            return res.status(400).json({
                status: 400,
                message: err.errors[0],
                data: null,
                success: false,
            });
        } else {
            console.error('Database error:', err);
            return res.status(500).json({
                status: 500,
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

        const deletedBengkel = await prisma.bengkel.delete({
            where: { id },
        });

        return res.status(200).json({
            status: 200,
            message: "Bengkel berhasil dihapus",
            data: deletedBengkel,
            success: true,
        });
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({
            status: 500,
            message: "Database error",
            data: null,
            success: false,
        });
    }
};

exports.editBengkel = async (req, res) => {
    const editBengkelSchema = yup.object().shape({
        namaBengkel: yup.string().required(),
        pemilik: yup.string().required(),
        nomorTelp: yup.string().required(),
        alamat: yup.string(),
        fotoBengkel: yup.string(),
        status: yup.string().oneOf(['AKTIF', 'TIDAKAKTIF']).required(),
    });

    try {
        const validData = await editBengkelSchema.validate(req.body);
        const { id } = req.params;

        const updatedBengkel = await prisma.bengkel.update({
            where: { id },
            data: {
                nama: validData.namaBengkel,
                pemilik: validData.pemilik,
                nomorTelp: validData.nomorTelp,
                alamat: validData.alamat || null,
                foto: validData.fotoBengkel || null,
                status: validData.status,
            },
        });

        return res.status(200).json({
            status: 200,
            message: "Bengkel berhasil diperbarui",
            data: updatedBengkel,
            success: true,
        });
    } catch (err) {
        if (err instanceof yup.ValidationError) {
            return res.status(400).json({
                status: 400,
                message: err.errors[0],
                data: null,
                success: false,
            });
        } else {
            console.error('Database error:', err);
            return res.status(500).json({
                status: 500,
                message: "Database error",
                data: null,
                success: false,
            });
        }
    }
};

exports.getAllBengkel = async (req, res) => {
    try {
        const bengkels = await prisma.bengkel.findMany();

        return res.status(200).json({
            status: 200,
            message: "Berhasil mengambil data semua bengkel",
            data: bengkels,
            success: true,
        });
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({
            status: 500,
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
        });

        if (!bengkel) {
            return res.status(404).json({
                status: 404,
                message: "Bengkel tidak ditemukan",
                data: null,
                success: false,
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Berhasil mengambil data bengkel",
            data: bengkel,
            success: true,
        });
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({
            status: 500,
            message: "Database error",
            data: null,
            success: false,
        });
    }
};