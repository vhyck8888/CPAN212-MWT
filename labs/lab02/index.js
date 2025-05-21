// index.js
import express from "express";
import lab_router from "./routers/lab_router.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use("/lab", lab_router);

app.get("/", (req, res) => {
    res.send("Hello to the project");
});

app.use((req, res) => {
    res.status(404).send("404 not found");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
