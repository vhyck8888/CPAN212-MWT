import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import _ from "lodash";
import multer from "multer";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: "uploads/" });

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.get("/data", (req, res) => {
  res.json({
    name: "Vik",
    email: "@com.mail",
    age: "immortal",
    bio: "abcd"
  });
});

app.post("/upload-images", upload.array("images", 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    console.log("Files uploaded:", req.files);
    res.json({ message: "Files uploaded successfully", files: req.files });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error uploading files", error: error.message });
  }
});

const getAllImages = () => {
  const uploadDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadDir)) return [];
  const allFiles = fs.readdirSync(uploadDir);
  return allFiles.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
};

app.get("/random-images", (req, res) => {
  const allImages = getAllImages();
  const selectedImages = _.sampleSize(allImages, Math.min(3, allImages.length));
  const imageUrls = selectedImages.map(img => `http://localhost:${PORT}/uploads/${img}`);
  res.json({ images: imageUrls });
});

app.use((req, res) => {
  res.status(404).send("404 page not found");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
