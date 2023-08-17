import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { authenticate, users } from "./auth"; // Import 'users' from auth

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Create token API
app.post("/create-token", (req, res) => {
  const username = "user1";
  const user = users.find((u) => u.username === username);
  if (user) {
    const token = jwt.sign({ sub: user.id }, "your-secret-key");
    const token2 = jwt.sign({ sub: user.id }, "your-secret-key");
    const token3 = jwt.sign({ sub: user.id }, "your-secret-key");
    res.json({ token, token2, token3 });
  } else {
    res.status(401).json({ message: "Invalid username" });
  }
});

// Protected route
app.get("/protected", authenticate, (req, res) => {
  res.json({
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

// Start the server
app.get("/", (req, res) => {
  res.sendFile("index.html", {
    root: __dirname,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
