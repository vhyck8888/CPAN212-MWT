const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {

}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const recipeRouter = require('./routes/recipes_router');
app.use('/', recipeRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
