const mongoose = require("mongoose");

const OutfitList = new mongoose.Schema({
  unique_no: {
    type: Number,
    required: true
  },
  genre: {
    type: String
  },
  category_name: {
    type: String
  },
  week_number: {
    type: Number
  }
});

module.exports = mongoose.model("outfit_pieces", OutfitList);
