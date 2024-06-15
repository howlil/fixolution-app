const prisma = require('../../configs/prisma')
const yup = require('yup')

const createTransactionSchema = yup.object().shape({
    user_id: yup.string().required(),
    total_harga: yup.number().required(),
    alamat: yup.string().required(),
    items: yup.array().of(
      yup.object().shape({
        sukucadang_id: yup.string().required(),
        quantity: yup.number().required().min(1),
      })
    ).required(),
  });
  
exports.createTransaction = async (req, res) => {
    try {
      await createTransactionSchema.validate(req.body);
      const { user_id, total_harga, alamat, items } = req.body;
  
      const transaction = await prisma.transaksi.create({
        data: {
          user_id,
          total_harga,
          alamat,
          status: 'Pending',
          transaksis_sukucadang: {
            create: items.map(item => ({
              sukucadang_id: item.sukucadang_id,
              quantity: item.quantity,
            })),
          },
        },
      });
  
      res.status(201).json({
        message: 'Transaction created successfully',
        data: transaction,
        success: true,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message || 'Failed to create transaction',
        success: false,
      });
    }
  };
  

exports.uploadPaymentProof = async (req, res) => {
    try {
      const { id } = req.params;
      const { bukti_pembayaran } = req.body;
  
      const transaction = await prisma.transaksi.update({
        where: { id },
        data: { bukti_pembayaran, status: 'Pending' },
      });
  
      res.status(200).json({
        message: 'Payment proof uploaded successfully',
        data: transaction,
        success: true,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message || 'Failed to upload payment proof',
        success: false,
      });
    }
  };
    

exports.verifyPayment = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body; 
  
      if (!['Diterima', 'Ditolak'].includes(status)) {
        return res.status(400).json({
          message: 'Invalid status. Status must be either Diterima or Ditolak.',
          success: false,
        });
      }
  
      const transaction = await prisma.transaksi.update({
        where: { id },
        data: { status },
      });
  
      res.status(200).json({
        message: 'Payment verified successfully',
        data: transaction,
        success: true,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message || 'Failed to verify payment',
        success: false,
      });
    }
  };