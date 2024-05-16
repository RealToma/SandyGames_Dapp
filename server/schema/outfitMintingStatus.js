const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    active_week: {
        type: Number,
        required: true
    },
    season_start_time: {
        type: Number,
        required: true
    },
    season_end_time: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model("outfit_states", schema);