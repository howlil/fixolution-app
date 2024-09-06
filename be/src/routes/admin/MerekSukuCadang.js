const {
  addMerek,
  getAllMerek,
  getMerekById,
  updateMerek,
  deleteMerek,
} = require("../../controllers/admin/MerekSukuCadang");
const md = require("../../middlewares/authmidleware");
const router = require("express").Router();

router.post(
  "/addMerek",
  md.authenticateToken,
  md.authorize("superadmin"),
  addMerek
);

router.get(
  "/getAllMerek",
  md.authenticateToken,
  md.authorize("superadmin"),
  getAllMerek
);

router.get(
  "/getMerekById/:id",
  md.authenticateToken,
  md.authorize("superadmin"),
  getMerekById
);

router.put(
  "/updateMerek/:id",
  md.authenticateToken,
  md.authorize("superadmin"),
  updateMerek
);

router.delete(
  "/deleteMerek/:id",
  md.authenticateToken,
  md.authorize("superadmin"),
  deleteMerek
);

module.exports = router;
