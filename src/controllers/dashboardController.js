const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");

// ✅ Summary (income, expense, balance)
exports.getSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const income = await Transaction.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId), type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expense = await Transaction.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId), type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = income[0]?.total || 0;
    const totalExpense = expense[0]?.total || 0;

    res.json({
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Category-wise totals
exports.categoryWise = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await Transaction.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Recent transactions
exports.recentTransactions = async (req, res) => {
  try {
    const data = await Transaction.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Monthly trends
exports.monthlyTrends = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await Transaction.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { month: { $month: "$date" } },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};