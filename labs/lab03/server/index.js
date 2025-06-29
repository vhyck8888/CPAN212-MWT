import express from "express";
import cors from "cors";
import multer from "multer";
import lodash from "lodash";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const  __filename = fileURLToPath(import.meta.url);
const uploadDir = path.join(__dirname, "upload");
const __dirname = path.dirname(__filename);



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/upload/') //change this
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniquePrefix + "-" + file.originalname)
    }
})

const upload = multer({ storage: storage })

const app = express();
const PORT = process.env.PORT || 8000;

//middleware
app.use(cors());

//routes
app.post('/save/single', upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(404).json({ message: "error uploading file" });
    }
    res.json({ message: "we got your file" });
});
app.use(cors()); // You imported it, so might as well use it

app.get("/fetch/single", (req, res) =>{
const upploadArray = fs.readdir(uploadDir);
const randomFile = lodash.sample(upploadArray);

if(!randomFile) {
    return res.status(404).json({message: "error empty dir"})
}
res.sendFile(path.join(uploadDir, randomFile));
})

// Catch-all route handler for 404
app.use("", (req, res) => {
    res.status(404).send("Page not found");
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
