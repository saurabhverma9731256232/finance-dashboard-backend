const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validate = require("../middleware/validateMiddleware");



const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

// create (analyst + admin)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("analyst", "admin"),
  createTransaction
);

// get (all roles)
router.get("/", authMiddleware, getTransactions);

// update (admin only)
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateTransaction
);

// delete (admin only)
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteTransaction
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("analyst", "admin"),
  validate,
  createTransaction
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  validate,
  updateTransaction
);

module.exports = router;