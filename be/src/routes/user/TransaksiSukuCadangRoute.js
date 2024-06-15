const expres = require('express');
const router = expres.Router();
const { createTransaction, uploadPaymentProof,verifyPayment } = require('../../controllers/user/TransaksiSukuCadangController');
const {authenticateToken,authorize} = require('../../middlewares/authmidleware');

router.post('/createTransaction',authenticateToken,authorize('user'), createTransaction);
router.patch('/uploadPaymentProof/:id',authenticateToken,authorize('user'), uploadPaymentProof);
router.patch('/verifyPayment/:id',authenticateToken,authorize('admin'), verifyPayment);

