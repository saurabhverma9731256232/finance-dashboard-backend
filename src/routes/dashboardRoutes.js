const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getSummary,
  categoryWise,
  recentTransactions,
  monthlyTrends,
} = require("../controllers/dashboardController");

router.get("/summary", authMiddleware, getSummary);
router.get("/category-wise", authMiddleware, categoryWise);
router.get("/recent", authMiddleware, recentTransactions);
router.get("/trends", authMiddleware, monthlyTrends);

module.exports = router;