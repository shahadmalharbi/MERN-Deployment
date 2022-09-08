const mongoose = require("mongoose")

const Reviewer = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "your Name is required"],
      },
    rating: {
        type: Number,
        required: [true, "your Rating is required"],
        min: [1, "You can't rate less than 1 star"],
        max: [5, "You can't rate higher than 5 stars"]
    },
    review:{
        type: String,
        required: [true, "your Review is required"],
    }
    
},{ timestamps: true })
const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minLength: [3, "Movie Title must be at least 3 characters"]
    },
    reviewer: [Reviewer]

}, { timestamps: true })

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie