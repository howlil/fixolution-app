const express = require('express');
const router = express.Router();
const bengkelController = require('../../controllers/admin/KelolaBengkelController');
const { authenticateToken, authorize } = require('../../middlewares/authmidleware');


router.post('/admin/addBengkel',authenticateToken, authorize('superadmin'), bengkelController.addBengkel);
router.delete('/admin/deleteBengkel/:id',authenticateToken, authorize('superadmin'), bengkelController.deleteBengkel);
router.put('/admin/editBengkel/:id',authenticateToken, authorize('superadmin'), bengkelController.editBengkel);
router.get('/admin/getAllBengkel',authenticateToken, authorize('superadmin'), bengkelController.getAllBengkel);
router.get('/admin/getBengkelById/:id',authenticateToken, authorize('superadmin'), bengkelController.getBengkelById);

module.exports = router;