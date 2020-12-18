const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    title : {
        type: String,
        require: true
    },
    related_value : {
        type: Number,
        required: true
    },
    Color : {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});
function isHexColor(s) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(s)
}

module.exports = mongoose.model("budget", budgetSchema);