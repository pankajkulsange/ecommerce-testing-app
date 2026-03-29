const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

let cart = [];

app.get("/cart", (req, res) => {
  res.json(cart);
});

app.post("/cart", (req, res) => {
  const product = req.body;

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  res.json({ message: "Item added to cart" });
});

app.delete("/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);

  cart = cart.filter((item) => item.id !== id);

  res.json({ message: "Item removed from cart" });
});

app.put("/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { quantity } = req.body;

  const item = cart.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  item.quantity = quantity;

  res.json({ message: "Quantity updated" });
});

// Dummy product data
const products = [
  {
    id: 1,
    name: "iPhone 14",
    price: 70000,
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    price: 65000,
  },
  {
    id: 3,
    name: "OnePlus 11",
    price: 60000,
  },
];

// Get all products
app.get("/products", (req, res) => {
  res.json(products);
});

// Fake database (temporary)
let users = [];

// Signup API
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  users.push({ name, email, password });

  res.json({ message: "User registered successfully" });
});

// Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful" });
});
