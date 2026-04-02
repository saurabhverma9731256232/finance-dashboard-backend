module.exports = (req, res, next) => {
  const { amount, type, category } = req.body;

  if (req.method === "POST" || req.method === "PUT") {
    if (amount !== undefined && amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }

    if (type && !["income", "expense"].includes(type)) {
      return res.status(400).json({ message: "Invalid type" });
    }

    if (category && category.trim() === "") {
      return res.status(400).json({ message: "Category is required" });
    }
  }

  next();
};