

const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    mood: {
        type: String,
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    studyTime: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Plan", planSchema);