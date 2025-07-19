const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  ingredients: [String],
  steps: [String],
});

module.exports = mongoose.model('Recipe', RecipeSchema);
