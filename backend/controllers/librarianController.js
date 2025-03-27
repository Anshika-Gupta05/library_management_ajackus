const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Librarian = require("../models/Librarian");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Register a new librarian
exports.registerLibrarian = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if librarian already exists
    let librarian = await Librarian.findOne({ email });
    if (librarian) {
      return res.status(400).json({ message: "Librarian already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    librarian = new Librarian({ name, email, password: hashedPassword });

    await librarian.save();
    res.status(201).json({ message: "Librarian registered successfully" });
  } catch (error) {
    console.error("Registration Error: ", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login a librarian
exports.loginLibrarian = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if librarian exists
    const librarian = await Librarian.findOne({ email });
    if (!librarian) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, librarian.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Sign and return JWT token
    const token = jwt.sign({ id: librarian._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token,
      librarian: {
        id: librarian._id,
        name: librarian.name,
        email: librarian.email,
      },
    });
  } catch (error) {
    console.error("Login Error: ", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
