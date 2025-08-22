import express from "express";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

// API Key
const API_KEY = "dpwoffc";

// Load data berita dari news.json
let news = JSON.parse(fs.readFileSync("./news.json", "utf-8"));

// Middleware validasi API Key
function checkApiKey(req, res, next) {
  const key = req.query.apikey;
  if (!key || key !== API_KEY) {
    return res.status(403).json({ status: "error", message: "Invalid API key" });
  }
  next();
}

// Endpoint: daftar berita
app.get("/news", checkApiKey, (req, res) => {
  const list = news.map(({ id, title, image, date }) => ({ id, title, image, date }));
  res.json({ status: "success", count: list.length, data: list });
});

// Endpoint: detail berita berdasarkan ID
app.get("/news/id/:id", checkApiKey, (req, res) => {
  const id = parseInt(req.params.id);
  const item = news.find(n => n.id === id);
  if (!item) {
    return res.status(404).json({ status: "error", message: "News not found" });
  }
  res.json({ status: "success", data: item });
});

app.listen(PORT, () => {
  console.log(`API DPW OFFC running at http://localhost:${PORT}`);
});
