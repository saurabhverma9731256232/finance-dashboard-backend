const Transaction = require("../models/Transaction");

// CREATE
exports.createTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.create({
            ...req.body,
            userId: req.user.id,
        });

        res.status(201).res.status(201).json({
            success: true,
            data: transaction,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL
exports.getTransactions = async (req, res) => {
  try {
    const { type, category, page = 1, limit = 5 } = req.query;

    let filter = { userId: req.user.id };

    if (type) filter.type = type;
    if (category) filter.category = category;

    const skip = (page - 1) * limit;

    const transactions = await Transaction.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Transaction.countDocuments(filter);

    res.json({
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// UPDATE
exports.updateTransaction = async (req, res) => {
    try {
        const updated = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE
exports.deleteTransaction = async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);

        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};